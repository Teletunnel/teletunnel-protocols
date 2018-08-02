'use strict'

/* eslint-env mocha */

const {fakeWrapped} = require('./utils')
const conn = () => fakeWrapped('')
const tcp = require('../src/tcp')
const assert = require('assert')

describe('tcp', () => {
  it('tcp module detects tcp', async () => {
    assert.deepStrictEqual(await tcp.detect(conn()), {port: '5233'})
  })
})
