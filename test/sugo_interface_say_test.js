/**
 * Test case for sugoInterfaceSay.
 * Runs with mocha.
 */
'use strict'

const sugoInterfaceSay = require('../lib/sugo_interface_say.js')
const assert = require('assert')
const sgSchemas = require('sg-schemas')
const sgValidator = require('sg-validator')
const co = require('co')

describe('sugo-interface-say', () => {
  let sayCommand = `${__dirname}/../doc/mocks/mock-say.sh`
  let voiceDir = `${__dirname}/../doc/mocks/mock-voices`
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Get interface spec', () => co(function * () {
    let interface_ = sugoInterfaceSay({ sayCommand, voiceDir })
    assert.ok(interface_)

    let { $spec } = interface_
    let specError = sgValidator(sgSchemas.interfaceSpec).validate($spec)
    assert.ok(!specError)
  }))

  it('Try ping-pong', () => co(function * () {
    let interface_ = sugoInterfaceSay({ sayCommand, voiceDir })
    let pong = yield interface_.ping({ params: [ 'pong' ] })
    assert.equal(pong, 'pong')
  }))

  it('Do assert', () => co(function * () {
    let interface_ = sugoInterfaceSay({ sayCommand, voiceDir })
    let caught
    try {
      yield interface_.assert({})
    } catch (err) {
      console.log(err)
      caught = err
    }
    assert.ok(!caught)
  }))

  it('Compare methods with spec', () => co(function * () {
    let interface_ = sugoInterfaceSay({ sayCommand, voiceDir })
    let { $spec } = interface_
    let implemented = Object.keys(interface_).filter((name) => !/^[\$_]/.test(name))
    let described = Object.keys($spec.methods).filter((name) => !/^[\$_]/.test(name))
    for (let name of implemented) {
      assert.ok(!!~described.indexOf(name), `${name} method should be described in spec`)
    }
    for (let name of described) {
      assert.ok(!!~implemented.indexOf(name), `${name} method should be implemented`)
    }
  }))
})

/* global describe, before, after, it */