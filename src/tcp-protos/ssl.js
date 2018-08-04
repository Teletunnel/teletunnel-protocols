'use strict'

const toSocket = require('pull-stream-to-net-socket')
const toPull = require('stream-to-pull-stream')
const tls = require('tls')
const sni = require('sni')

const SSL = module.exports = {
  name: 'ssl',
  properties: {
    hostname: {
      type: 'string',
      matcher: 'glob'
    }
  },
  detect: async (conn) => {
    const headerSize = 5
    let data = await conn.read(headerSize)

    // verify ContentType is handshake
    if (data[0] !== 22) return false

    // verify protocol version is > 3.0 && <= 3.3
    const majorVersion = data[1]
    const minorVersion = data[2]
    if (majorVersion !== 3) return false
    if (minorVersion < 1 || minorVersion > 3) return false

    // verify we have enough data to parse the record
    const length = data[3] << 8 | data[4]
    data = Buffer.concat([data, await conn.read(length)])

    // verify handshake type is client hello
    if (data[5] !== 1) return false

    let name = sni(data)

    return {hostname: name || ''}
  },
  stream: (conn) => new Promise((resolve, reject) => { // TODO: optimize this by finding a way to convert a pull-stream into a net socket _without_ a net.Server
    toSocket(conn, {
      createServer: () => tls.createServer(SSL.options.connection),
      prefire: true
    }, (err, socket) => {
      if (err) return reject(err)
      resolve(toPull(socket))
    })
  })
}
