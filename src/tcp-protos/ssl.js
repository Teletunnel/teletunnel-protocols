'use strict'

/* const SSL = */ module.exports = {
  name: 'ssl',
  properties: {
    hostname: {
      type: 'string',
      matcher: 'glob'
    }
  },
  detect: async (conn) => {

  },
  stream: async (conn) => {
    // SSL.options.SNICallback
  }
}
