'use strict'

const Plugin = require('../')
module.exports = class TestPlugin extends Plugin {
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
      bots: {
        'hue': {
          'name': 'Philips HUE lights',
          'freeStates': {}
        }
      },
      pkg: {
        name: 'lisa-plugin-test-lisa',
        version: '0.0.0'
      }
    })
  }
}
