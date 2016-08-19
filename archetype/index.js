'use strict'

const Plugin = require('lisa-plugin')

module.exports = class MyPlugin extends Plugin {
  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
