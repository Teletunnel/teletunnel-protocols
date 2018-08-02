'use strict'

module.exports = {
  name: 'ssh',
  properties: {
    version: {
      type: 'string',
      match: 'strict'
    }
  },
  detect: async (conn) => { // ssh client sends SSH-2.0<VERSION>\r\n
    let version = String(await conn.read(7))

    if (version !== 'SSH-2.0') {
      return false
    }

    let next
    while ((next = String(await conn.read(1))) !== '\r') { // TODO: add reading limit
      version += next
    }

    return {version}
  }
}
