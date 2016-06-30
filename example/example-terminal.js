#!/usr/bin/env node

/**
 * Example control from remote terminal
 */
'use strict'

const co = require('co')
const assert = require('assert')
const sugoTerminal = require('sugo-terminal')

co(function * () {
  let terminal = sugoTerminal('http://my-sugo-cloud.example.com/terminals', {})
  let spot = terminal.connect('my-spot-01')

  // Access to the interface
  let say = spot.say()

  // Send ping
  let pong = yield say.ping()
  assert.ok(pong)

  // List available voices
  let voices = yield say.voices()
  console.log(voices)

  // Speech text
  say.say('Hi, there', { voice: voices[ 0 ] })

}).catch((err) => console.error(err))
