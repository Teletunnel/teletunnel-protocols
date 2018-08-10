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
    if (String(await conn.read(8)) !== 'SSH-2.0-') {
      return false
    }

    let version = ''
    let next
    while (version.length < 100) {
      while ((next = String(await conn.read(1))) !== '\r') {
        version += next
      }
      break
    }

    return {version}
  }
}
