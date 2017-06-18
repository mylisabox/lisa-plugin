'use strict'

const Plugin = require('lisa-plugin')

module.exports = class <%= nameNormalized %>Plugin extends Plugin {

  /**
   * Initialisation of your plugin
   * Called once, when plugin is loaded
   * @returns Promise
   */
  init() {
    return super.init()
  }

  /**
   * Called when
   * @param action to execute
   * @param infos context of the action
   * @return Promise
   */
  interact(action, infos) {
    return Promise.resolve()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      drivers: require('./drivers'),
      pkg: require('./package')
    })
  }
}
