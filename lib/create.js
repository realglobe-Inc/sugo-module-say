/**
 * Create a module instance
 * @function create
 * @returns {Say}
 */
'use strict'

const Say = require('./say')

/** @lends create */
function create (...args) {
  return new Say(...args)
}

module.exports = create
