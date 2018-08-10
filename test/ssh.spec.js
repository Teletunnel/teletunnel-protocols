'use strict'

/* eslint-env mocha */

const {fakeWrapped} = require('./utils')
const conn = () => fakeWrapped('SSH-2.0-OpenSSH_7.2p2 Ubuntu-4ubuntu2.4\r\n')
const ssh = require('../src/tcp-protos/ssh')
const assert = require('assert')

describe('ssh', () => {
  it('ssh module detects ssh', async () => {
    assert.deepStrictEqual(await ssh.detect(conn()), {version: 'OpenSSH_7.2p2 Ubuntu-4ubuntu2.4'})
  })
})
