#!/usr/bin/env node

/**
 * Example usage of the terminal
 */
'use strict'

const sugoInterfaceSay = require('sugo-interface-say')
const sugoSpot = require('sugo-spot')
const co = require('co')

co(function * () {
  let spot = sugoSpot('http://my-sugo-cloud.example.com/spots', {
    key: 'my-spot-01',
    interfaces: {
      // Register the interface
      say: sugoInterfaceSay({})
    }
  })
  yield spot.connect()
}).catch((err) => console.error(err))
