/**
 * Test case for sugoModuleSay.
 * Runs with mocha.
 */
'use strict'

const sugoModuleSay = require('../lib/sugo_module_say.js')
const assert = require('assert')
const sgSchemas = require('sg-schemas')
const sgValidator = require('sg-validator')
const co = require('co')

describe('sugo-module-say', () => {
  let sayCommand = `${__dirname}/../doc/mocks/mock-say.sh`
  let voiceDir = `${__dirname}/../doc/mocks/mock-voices`
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Get module spec', () => co(function * () {
    let module = sugoModuleSay({ sayCommand, voiceDir })
    assert.ok(module)

    let { $spec } = module
    let specError = sgValidator(sgSchemas.moduleSpec).validate($spec)
    assert.ok(!specError)
  }))

  it('Try ping-pong', () => co(function * () {
    let module = sugoModuleSay({ sayCommand, voiceDir })
    let pong = yield module.ping({ params: [ 'pong' ] })
    assert.equal(pong, 'pong')
  }))

  it('Do assert', () => co(function * () {
    let module = sugoModuleSay({ sayCommand, voiceDir })
    let caught
    try {
      yield module.assert({})
    } catch (err) {
      console.log(err)
      caught = err
    }
    assert.ok(!caught)
  }))

  it('Compare methods with spec', () => co(function * () {
    let module = sugoModuleSay({ sayCommand, voiceDir })
    let { $spec } = module
    let implemented = Object.keys(module).filter((name) => !/^[\$_]/.test(name))
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
