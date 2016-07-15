#!/usr/bin/env node

/**
 * Example control from remote caller
 */
'use strict'

const co = require('co')
const assert = require('assert')
const sugoCaller = require('sugo-caller')

co(function * () {
  let caller = sugoCaller('http://my-sugo-cloud.example.com/callers', {})
  let actor = caller.connect('my-actor-01')

  // Access to the module
  let say = actor.say()

  // Send ping
  let pong = yield say.ping()
  assert.ok(pong)

  // List available voices
  let voices = yield say.voices()
  console.log(voices)

  // Speech text
  say.say('Hi, there', { voice: voices[ 0 ] })

}).catch((err) => console.error(err))
