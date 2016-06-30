/**
 * Say command interface for SUGOS
 * @module sugo-interface-say
 */

'use strict'

const sugoInterfaceSay = require('./sugo_interface_say')

let lib = sugoInterfaceSay.bind(this)

Object.assign(lib, sugoInterfaceSay, {
  sugoInterfaceSay
})

module.exports = lib
