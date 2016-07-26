/**
 * Test case for Say.
 * Runs with mocha.
 */
'use strict'

const Say = require('../lib/say.js')
const assert = require('assert')
const asleep = require('asleep')
const sgSchemas = require('sg-schemas')
const sgValidator = require('sg-validator')
const co = require('co')
const { EventEmitter } = require('events')

describe('sugo-module-say', () => {
  let sayCommand = `${__dirname}/../misc/mocks/mock-say.sh`
  let voiceDir = `${__dirname}/../misc/mocks/mock-voices`
  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Get module spec', () => co(function * () {
    let module = new Say({ sayCommand, voiceDir })
    assert.ok(module)

    let { $spec } = module
    let specError = sgValidator(sgSchemas.moduleSpec).validate($spec)
    assert.ok(!specError)
  }))

  it('Try ping-pong', () => co(function * () {
    let module = new Say({ sayCommand, voiceDir })
    let pong = yield module.ping('pong')
    assert.equal(pong, 'pong')
  }))

  it('Do assert', () => co(function * () {
    let module = new Say({ sayCommand, voiceDir })
    let caught
    try {
      yield module.assert()
    } catch (err) {
      console.log(err)
      caught = err
    }
    assert.ok(!caught)
  }))

  it('Say if possible', () => co(function * () {
    try {
      let say = Object.assign(new Say({ $emitter: new EventEmitter }), {
        on () {}
      })
      let voices = yield say.voices()
      assert.ok(voices)
      yield say.say('Here we are!')
      yield asleep(100)
    } catch (e) {
      // DO nothing
      console.log(e)
    }
  }))

  it('Compare methods with spec', () => co(function * () {
    let module = new Say({ sayCommand, voiceDir })
    let { $spec } = module
    let implemented = Object.getOwnPropertyNames(Say.prototype)
      .filter((name) => !/^[\$_]/.test(name))
      .filter((name) => !~[ 'constructor' ].indexOf(name))
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
