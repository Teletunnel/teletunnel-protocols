'use strict'

const Connection = require('interface-connection').Connection
const pull = require('pull-stream')
const multiaddr = require('multiaddr')
const wrapper = require('teletunnel-core/src/wrapper')

module.exports = {
  fakeConn: (bytesOrString, multiaddrs) => {
    let bytes = Buffer.from(bytesOrString)
    let conn = {
      source: pull.values([bytes]),
      sink: pull.drain()
    }
    conn.getObservedAddrs = (cb) => cb(null, multiaddrs || [multiaddr('/ip4/127.0.0.1/tcp/5233')])
    return new Connection(conn)
  },
  fakeWrapped: (...a) => {
    return wrapper({conn: module.exports.fakeConn(...a)}).createReader()
  }
}
