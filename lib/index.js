/**
 * Say command module for SUGOS. (Supports only OSX)
 * @module sugo-module-say
 * @version 4.0.0
 */

'use strict'

const create = require('./create')
const Say = require('./say')

let lib = create.bind(this)

Object.assign(lib, Say, {
  create,
  Say
})

module.exports = lib
