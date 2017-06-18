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

  it('should have api driver', () => {
    assert(plugin.drivers)
    assert(plugin.drivers.MyDriver)
    assert.equal(plugin.drivers.MyDriver.log, console.log)
    assert.equal(plugin.drivers.MyDriver._, fakeLisa._)
    assert.equal(plugin.drivers.MyDriver.i18n, fakeLisa._)
    assert(plugin.drivers.MyDriver.plugin)
    assert.equal(plugin.drivers.MyDriver.plugin.name, 'testLisa')
  })
})
