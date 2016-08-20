'use strict'
/* global describe, it */

const assert = require('assert')
const pkg = require('../../package.json')
const Plugin = require('../../')

describe('plugin', () => {

  before(() => {
    global.app.packs['lisa-plugins-manager'][pkg.name] = new Plugin(global.app.lisa)
  })

  it('should exist', () => {
    assert(global.app.packs['lisa-plugins-manager'][pkg.name])
    assert.equal(global.app.packs['lisa-plugins-manager'][pkg.name].name, pkg.name.replace(/lisa\-/, '').replace(/plugin\-/, ''))
  })
})
