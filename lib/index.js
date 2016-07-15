/**
 * Say command module for SUGOS. (Supports only OSX)
 * @module sugo-module-say
 */

'use strict'

const sugoModuleSay = require('./sugo_module_say')

let lib = sugoModuleSay.bind(this)

Object.assign(lib, sugoModuleSay, {
  sugoModuleSay
})

module.exports = lib
