'use strict'

const assert = require('assert')
const Plugin = require('../../')

String.prototype.toCamelCase = function () {
  return this.toLowerCase().replace(/(?:_|-)(.)/g, (match, group1) => {
    return group1.toUpperCase()
  })
}

class TestPlugin extends Plugin {
  constructor(lisa) {
    super(lisa, {
      config: {},
      api: {
        controllers: {
          MyController: class MyController extends Plugin.Controller {

          }
        },
        services: {
          MyService: class MyService extends Plugin.Service {

          }
        }
      },
      pkg: {
        name: 'lisa-plugin-test-lisa',
        version: '0.0.0'
      }
    })
  }
}

describe('lisa-plugin', ()=> {
  const fakeLisa = {
    log: console.log,
    _: () => {}
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
