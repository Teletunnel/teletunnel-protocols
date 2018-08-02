'use strict'

const Connection = require('interface-connection')
const pull = require('pull-stream')
const multiaddr = require('multiaddr')

module.exports = {
  fakeConn: (bytesOrString, multiaddrs) => {
    let bytes = Buffer.from(bytesOrString)
    let conn = {
      source: pull.values(bytes),
      sink: pull.drain()
    }
    return new Connection(conn, {
      getObservedAddrs: (cb) => cb(null, multiaddrs || [multiaddr('/ip4/127.0.0.1/tcp/5233')])
    })
  }
}
