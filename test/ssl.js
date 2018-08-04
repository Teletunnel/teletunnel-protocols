'use strict'

/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const handshake = fs.readFileSync(path.join(__dirname, '/ssl.handshake'))
const {fakeWrapped} = require('./utils')
const conn = () => fakeWrapped(handshake)
const ssl = require('../src/tcp-protos/ssl')
const assert = require('assert')

describe('ssl', () => {
  it('ssl module detects ssl', async () => {
    assert.deepStrictEqual(await ssl.detect(conn()), {hostname: 'hello.example.com'})
  })
})
