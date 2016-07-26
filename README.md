sugo-module-say
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_com_shield_url]][bd_travis_com_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/sugo-module-say
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/sugo-module-say
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/sugo-module-say.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/sugo-module-say
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/sugo-module-say.svg?token=aeFzCpBZebyaRijpCFmm
[bd_license_url]: https://github.com/realglobe-Inc/sugo-module-say/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/sugo-module-say
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/sugo-module-say.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/sugo-module-say.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/sugo-module-say
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/sugo-module-say.svg
[bd_npm_url]: http://www.npmjs.org/package/sugo-module-say
[bd_npm_shield_url]: http://img.shields.io/npm/v/sugo-module-say.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Say command module for SUGOS. (Supports only OSX)

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/00.Requirements.md.hbs" Start -->

<a name="section-doc-guides-00-requirements-md"></a>

Requirements
-----
<a href="http://www.apple.com/mac/">
  <img src="https://realglobe-inc.github.io/sugos-assets/images/mac-banner.svg"
       alt="Mac"
       height="40"
       style="height:40px"
  /></a>
<a href="https://nodejs.org">
  <img src="https://realglobe-inc.github.io/sugos-assets/images/nodejs-banner.png"
       alt="Node.js"
       height="40"
       style="height:40px"
  /></a>
<a href="https://docs.npmjs.com/">
  <img src="https://realglobe-inc.github.io/sugos-assets/images/npm-banner.png"
       alt="NPM"
       height="40"
       style="height:40px"
  /></a>

+ [MAC ( OS X )][mac_url]
+ [Node.js ( >=6 )][node_download_url]
+ [npm ( >=3 )][npm_url]

This modules uses `say` command of OSX, thus you need a mac.

[mac_url]: http://www.apple.com/mac/
[node_download_url]: https://nodejs.org/en/download/
[npm_url]: https://docs.npmjs.com/



<!-- Section from "doc/guides/00.Requirements.md.hbs" End -->

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install sugo-module-say --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

Register module to SUGO-Actor

```javascript
#!/usr/bin/env node

/**
 * Example usage to register module on actor
 * @see https://github.com/realglobe-Inc/sugo-actor
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

```

Then, call the module from remote caller.

```javascript
#!/usr/bin/env node

/**
 * Example to call from caller
 * @see https://github.com/realglobe-Inc/sugo-caller
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

```

<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.Methods.md.hbs" Start -->

<a name="section-doc-guides-03-methods-md"></a>

Methods
---------

The following methods are available from remote callers for the module.

+ [.voices() -> array](#method-voices)
+ [.say(text, options)](#method-say)
+ [.ping(pong) -> string](#method-ping)
+ [.assert() -> boolean](#method-assert)

<a name="method-voices"></a>
### .voices() -> <code>array</code>

List available voices

<a name="method-say"></a>
### .say(text, options)

Say texts

| Param | Type | Description |
| ----- | ---- | ----------- |
| text  | <code>string</code> | Text to say |
| options  | <code>Object</code> | Optional settings |

<a name="method-ping"></a>
### .ping(pong) -> <code>string</code>

Test the reachability of a module.

| Param | Type | Description |
| ----- | ---- | ----------- |
| pong  | <code>string</code> | Pong message to return |

<a name="method-assert"></a>
### .assert() -> <code>boolean</code>

Test if the actor fulfills system requirements



<!-- Section from "doc/guides/03.Methods.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/realglobe-Inc/sugo-module-say/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [SUGOS][sugos_url]

[sugos_url]: https://github.com/realglobe-Inc/sugos

<!-- Links End -->
