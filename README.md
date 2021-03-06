[![node-vk-bot-api-session-redis](https://img.shields.io/npm/v/node-vk-bot-api-session-redis.svg?style=flat-square)](https://www.npmjs.com/package/node-vk-bot-api-session-redis/)
[![node-vk-bot-api-session-redis](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# node-vk-bot-api-session-redis

📄 Redis session middleware for [node-vk-bot-api](https://github.com/node-vk-bot-api/node-vk-bot-api).

## Install

```sh
$ npm i node-vk-bot-api-session-redis -S
```

## Tests

Before you must set `TOKEN` and `GROUP_ID` in `process.env`.

```sh
$ npm test
```

## Usage

```javascript
const VkBot = require('node-vk-bot-api')
const RedisSession = require('node-vk-bot-api-session-redis')

const bot = new VkBot(process.env.TOKEN)
const session = new RedisSession()

bot.use(session.middleware())

bot.on((ctx) => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++

  ctx.reply(`You wrote ${ctx.session.counter} messages.`)
})

bot.startPolling()
```

## API

### Options

* `host`: Redis host (default: `127.0.0.1`)
* `port`: Redis port (default: `6379`)
* `password`: Redis password
* `key`: Context property name (default: `session`)
* `getSessionKey`: Method for get session key

Default `getSessionKey`:

```js
const getSessionKey = (ctx) => {
  const userId = ctx.message.from_id || ctx.message.user_id;

  return `${userId}:${userId}`;
};
````

### Clear session

```js
bot.on((ctx) => {
  ctx.session = null
})
```

## License

MIT.


