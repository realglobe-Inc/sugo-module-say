/**
 * Say command module for SUGOS
 * @function sugoModuleSay
 * @param {Object} config - Configuration
 * @returns {Object} - Module settings
 */
'use strict'

const { name, version, description } = require('../package.json')
const co = require('co')
const defaults = require('defaults')
const { hasBin } = require('sg-check')
const { EOL } = require('os')
const sugoModuleShell = require('sugo-module-shell')
const debug = require('debug')('sugo:module:say')

/** @lends sugoModuleSay */
function sugoModuleSay (config = {}) {
  debug('Config: ', config)

  let shell = sugoModuleShell()
  let { sayCommand, voiceDir } = defaults(config, {
    sayCommand: 'say',
    voiceDir: '/System/Library/Speech/Voices'
  })

  return {
    /**
     * List available voices
     * @param {SugoModuleContext} ctx
     * @returns {Promise.<string[]>}
     */
    voices (ctx) {
      let { params, pipe } = ctx
      return co(function * () {
        debug('Search voices from:', voiceDir)
        let listed = yield shell.exec({
          params: [ `ls ${voiceDir}` ],
          pipe
        })
        return listed.split(EOL)
          .map((name) => String(name).trim())
          .filter((name) => /\.SpeechVoice$/.test(name))
          .map((name) => name
            .replace(/\.SpeechVoice$/, '')
            .replace(/Compact$/, '')
          )
      })
    },

    /**
     * Speech texts
     * @param {SugoModuleContext} ctx
     * @returns {*|Promise}
     */
    say (ctx) {
      let { params, pipe } = ctx
      return co(function * () {
        let [text, options] = params
        let args = [ text ]
        let { voice } = options
        if (voice) {
          args = [ '-v', voice ].concat(args)
        }
        return yield shell.spawn({
          params: [ sayCommand, args ],
          pipe
        })
      })
    },

    /**
     * Ping a message.
     * @param {SugoModuleContext} ctx
     * @returns {Promise.<string>} - Pong message
     */
    ping (ctx) {
      let { params, pipe } = ctx
      return co(function * pingAck () {
        return params[ 0 ] || 'pong' // Return result to remote caller.
      })
    },

    /**
     * Assert actor system requirements.
     * @param {SugoModuleContext} ctx
     * @throws {Error} - System requirements failed error
     * @returns {Promise.<boolean>} - Asserted state
     */
    assert (ctx) {
      const bins = [ 'node', sayCommand ] // Required commands
      return co(function * assertAck () {
        for (let bin of bins) {
          let ok = yield hasBin(bin)
          if (!ok) {
            throw new Error(`[${name}] Command not found: ${bin}`)
          }
        }
        return true
      })
    },

    /**
     * Module specification
     * @see https://github.com/realglobe-Inc/sg-schemas/blob/master/lib/module_spec.json
     */
    $spec: {
      name,
      version,
      desc: description,
      methods: {
        voices: {
          desc: 'List available voices',
          params: [],
          return: {
            type: 'array',
            desc: 'Name of voices'
          }
        },

        say: {
          desc: 'Say texts',
          params: [
            { name: 'text', type: 'string', desc: 'Text to say' },
            { name: 'options', type: 'Object', desc: 'Optional settings' }
          ]
        },

        ping: {
          desc: 'Test the reachability of a module.',
          params: [
            { name: 'pong', type: 'string', desc: 'Pong message to return' }
          ],
          return: {
            type: 'string',
            desc: 'Pong message'
          }
        },

        assert: {
          desc: 'Test if the actor fulfills system requirements',
          params: [],
          throws: [ {
            type: 'Error',
            desc: 'System requirements failed'
          } ],
          return: {
            type: 'boolean',
            desc: 'System is OK'
          }
        }
      }
    }
  }
}

module.exports = sugoModuleSay

/**
 * @typedef {Object} SugoModuleContext
 * @property {Array} params - Invoke parameters.
 * @property {EventEmitter} pipe - Pipe to remote caller.
 */
