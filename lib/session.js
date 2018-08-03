const createClient = require('./redis')

class Session {
  constructor(settings) {
    Object.assign(this, {
      key: 'session',
      host: '127.0.0.1',
      port: 6379,
      getSessionKey: ctx => `${ctx.message.from_id}:${ctx.message.from_id}`
    }, settings)

    this.redis = createClient({
      host: this.host,
      port: this.port
    })
  }

  middleware() {
    return async (ctx, next) => {
      const key = this.getSessionKey(ctx)
      const session = JSON.parse((await this.redis.get(key)) || '{}')

      Object.defineProperty(ctx, this.key, {
        get: () => session,
        set: value => (session = value),
      })

      await this.redis.set(key, JSON.stringify(session))
      await next()
    }
  }
}

module.exports = Session
