'use strict'

const toSocket = require('pull-stream-to-net-socket')
const tls = require('tls')

const SSL = module.exports = {
  name: 'ssl',
  properties: {
    hostname: {
      type: 'string',
      matcher: 'glob'
    }
  },
  detect: async (conn) => {

  },
  stream: (conn) => new Promise((resolve, reject) => {
    toSocket(conn, {
      createServer: () => tls.createServer(SSL.options.connection),
      prefire: true
    }, (err, socket) => {
      if (err) return reject(err)
      resolve(socket)
    })
  })
}
