const redis = require('redis')
const util = require('util')

module.exports = (settings) => {
  const client = redis.createClient(settings)

  return {
    get: util.promisify(client.get).bind(client),
    set: util.promisify(client.set).bind(client),
  }
}
