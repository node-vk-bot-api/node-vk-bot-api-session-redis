const { expect } = require('chai')
const sinon = require('sinon')
const RedisSession = require('../lib/session')
const { bot, handleUpdate } = require('./config.test.js')

const session = new RedisSession()

const user = { name: 'bifot' }

bot.use(session.middleware())

describe('session', () => {
  it('set session', async () => {
    const callback = sinon.fake()

    bot.command('/set', (ctx) => {
      expect(ctx.session).to.deep.equal({})

      ctx.session.user = user

      callback()
      expect(ctx.session.user).to.deep.equal(user)
    })

    await handleUpdate('/set')

    expect(callback.calledOnce).eq(true)
  })

  it('get session', async () => {
    const callback = sinon.fake()

    bot.command('/get', (ctx) => {
      callback()
      expect(ctx.session.user).to.deep.equal(user)

      // clear session for set inital data
      ctx.session = null
    })

    await handleUpdate('/get')

    expect(callback.calledOnce).eq(true)
  })
})
