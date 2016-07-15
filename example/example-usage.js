#!/usr/bin/env node

/**
 * Example usage of the caller
 */
'use strict'

const sugoModuleSay = require('sugo-module-say')
const sugoActor = require('sugo-actor')
const co = require('co')

co(function * () {
  let actor = sugoActor('http://my-sugo-cloud.example.com/actors', {
    key: 'my-actor-01',
    modules: {
      // Register the module
      say: sugoModuleSay({})
    }
  })
  yield actor.connect()
}).catch((err) => console.error(err))
