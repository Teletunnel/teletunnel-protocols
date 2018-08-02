const tcpProtos = require('./tcp-protos')

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
    return tcp ? {port: tcp.toNodeOptions().port} : false
  },
  stream: (conn) => conn, // well... it's already tcp
  children: tcpProtos
}