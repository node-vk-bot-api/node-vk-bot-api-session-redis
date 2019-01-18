const createClient = require('./redis')

class Session {
  constructor(settings) {
    Object.assign(this, {
      key: 'session',
      getSessionKey: (ctx) => {
        const userId = ctx.message.from_id || ctx.message.user_id

        return `${userId}:${userId}`
      },
    }, settings)

    this.redis = createClient({
      host: this.host,
      port: this.port,
      password: this.password,
    })
  }

  middleware() {
    return async (ctx, next) => {
      const key = this.getSessionKey(ctx)
      let session = JSON.parse((await this.redis.get(key)) || '{}')

      Object.defineProperty(ctx, this.key, {
        get: () => session,
        set: (value) => {
          session = value === null ? {} : value
        },
      })

      await next()

      if (!Object.keys(session || {}).length) {
        await this.redis.del(key)
      } else {
        await this.redis.set(key, JSON.stringify(session))
      }
    }
  }
}

module.exports = Session
