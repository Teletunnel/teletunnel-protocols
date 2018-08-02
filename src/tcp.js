'use strict'

const tcpProtos = require('./tcp-protos')
const mafmt = require('mafmt')

module.exports = {
  name: 'tcp',
  properties: {
    port: {
      type: 'number',
      matcher: 'strict'
    }
  },
  detect: async (conn) => {
    const addrs = await conn.getAddrs()
    let tcp = addrs.filter(mafmt.TCP.matches)[0]
    return tcp ? {port: tcp.nodeAddress().port} : false
  },
  stream: (conn) => conn, // well... it's already tcp
  children: tcpProtos
}
