'use strict'
/* global describe, it */

const assert = require('assert')
const pkg = require('../../package.json')
const Plugin = require('../../')

describe('plugin', () => {
  let plugin
  before(() => {
    plugin = new Plugin(global.app.lisa)
    global.app.packs.pluginsManager[plugin.name] = plugin
  })

  it('should exist', () => {
    assert(plugin)
  })
})
