const { expect } = require('chai')
const sinon = require('sinon')
const RedisSession = require('../lib/session')
const { bot, handleUpdate } = require('./config.test.js')

const session = new RedisSession()

bot.use(session.middleware())

describe('session', () => {
  it('set session', async () => {
    const callback = sinon.fake()

    bot.command('/set', (ctx) => {
      ctx.session.user = { name: 'bifot' }

      callback()
      expect(ctx.session.user).to.be.a('object')
    })

    await handleUpdate('/set')

    expect(callback.calledOnce).eq(true)
  })

  it('get session', async () => {
    const callback = sinon.fake()

    bot.command('/get', (ctx) => {
      callback()
      expect(ctx.session.user).to.be.a('object')
    })

    await handleUpdate('/get')

    expect(callback.calledOnce).eq(true)
  })
})
