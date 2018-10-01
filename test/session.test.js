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
      ctx.session.user = user

      callback()
      expect(ctx.session.user).to.be.a('object')
      expect(ctx.session.user).to.eql(user)
    })

    await handleUpdate('/set')

    expect(callback.calledOnce).eq(true)
  })

  it('get session', async () => {
    const callback = sinon.fake()

    bot.command('/get', (ctx) => {
      callback()
      expect(ctx.session.user).to.be.a('object')
      expect(ctx.session.user).to.eql(user)
    })

    await handleUpdate('/get')

    expect(callback.calledOnce).eq(true)
  })
})
