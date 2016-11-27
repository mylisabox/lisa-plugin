'use strict'

const assert = require('assert')
const TestPlugin = require('../fake.plugin')

String.prototype.toCamelCase = function () {
  return this.toLowerCase().replace(/(?:_|-)(.)/g, (match, group1) => {
    return group1.toUpperCase()
  })
}

describe('lisa-plugin unit', ()=> {
  const fakeLisa = {
    log: console.log,
    _: () => {
    },
    getChatBot: () => {
      return Promise.resolve()
    }
  }

  const plugin = new TestPlugin(fakeLisa)

  it('should return name in camel case', () => {
    assert.equal(plugin.name, 'testLisa')
  })

  it('should return log function', () => {
    assert.equal(plugin.log, console.log)
  })

  it('should have lisa instance', () => {
    assert(plugin.lisa)
  })

  it('should have api controllers', () => {
    assert(plugin.controllers)
    assert(plugin.controllers.MyController)
    assert.equal(plugin.controllers.MyController.log, console.log)
    assert.equal(plugin.controllers.MyController._, fakeLisa._)
    assert.equal(plugin.controllers.MyController.i18n, fakeLisa._)
    assert(plugin.controllers.MyController.plugin)
    assert.equal(plugin.controllers.MyController.plugin.name, 'testLisa')
  })

  it('should have api services', () => {
    assert(plugin.services)
    assert(plugin.services.MyService)
    assert.equal(plugin.services.MyService.log, console.log)
    assert.equal(plugin.services.MyService._, fakeLisa._)
    assert.equal(plugin.services.MyService.i18n, fakeLisa._)
    assert(plugin.services.MyService.plugin)
    assert.equal(plugin.services.MyService.plugin.name, 'testLisa')
  })
})
