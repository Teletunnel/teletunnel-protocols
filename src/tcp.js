'use strict'

const tcpProtos = require('./tcp-protos')
const mafmt = require('mafmt')
const prom = (fnc) => new Promise((resolve, reject) => fnc((err, res) => err ? reject(err) : resolve(res)))

module.exports = {
  name: 'tcp',
  properties: {
    port: {
      type: 'number',
      matcher: 'strict'
    }
  },
  detect: (conn) => {
    const addrs = prom(cb => conn.getObservedAddrs(cb))
    let tcp = addrs.filter(mafmt.TCP.matches)[0]
    return tcp ? {port: tcp.nodeAddress().port} : false
  },
  stream: (conn) => conn, // well... it's already tcp
  children: tcpProtos
}
