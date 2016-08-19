'use strict'

const _ = require('lodash')

module.exports = class Plugin {
  /**
   * @constructor
   * @param lisa L.I.S.A. instance
   * @param plugin.api The api entities defined in this plugin (api/ folder)
   * @param plugin.config The plugin configuration (config/ folder)
   * @param plugin.pkg The plugin package.json
   *
   * Instantiate the Plugin and set some initial properties. All Plugins
   * should implement their own constructors, and call super(lisa, plugin) with
   * their own definitions. Implementing application logic in the plugin
   * constructor is not recommended.
   */
  constructor(lisa, plugin) {
    this.lisa = lisa

    plugin = _.merge({
      config: {},
      api: {}
    }, plugin)

    Object.defineProperties(this, {
      pkg: {
        value: Object.freeze(plugin.pkg),
        enumerable: false
      },
      config: {
        value: plugin.config,
        enumerable: false
      }
    })
    this.controllers = this._bindMethods(lisa, plugin, 'controllers')
    this.services = this._bindMethods(lisa, plugin, 'services')
  }

  /**
   * Bind the context of API resource methods.
   */
  _bindMethods (app, plugin, resource) {
    return _.mapValues(plugin.api[resource], (Resource, resourceName) => {
      if (_.isPlainObject(Resource)) {
        throw new Error(`${resourceName} should be a class. It is a regular object`)
      }

      return new Resource(app)
    })
  }

  /**
   *
   * @returns Promise
   */
  init() {
    return Promise.resolve()
  }

  /**
   * Called automatically to search for new devices
   * @return Promise
   */
  searchDevices() {
    return Promise.resolve()
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

  /**
   * Unload this Plugin. This method will instruct the plugin to perform
   * any necessary cleanup with the expectation that the app will stop or reload
   * soon thereafter.
   */
  unload() {

  }

  emit() {
    return this.lisa.emit.apply(this.lisa, arguments)
  }

  once() {
    return this.lisa.once.apply(this.lisa, arguments)
  }

  on() {
    return this.lisa.once.apply(this.lisa, arguments)
  }

  after() {
    return this.lisa.after.apply(this.lisa, arguments)
  }

  /**
   * Expose the application's logger directly on the Plugin for convenience.
   */
  get log() {
    return this.lisa.log
  }

  /**
   * Return the name of this Plugin. By default, this is the name of the
   * npm module (in package.json). This method can be overridden for plugins
   * which do not follow the "lisa-" prefix naming convention.
   *
   * @return String
   */
  get name() {
    return this.pkg.name.replace(/lisa\-/, '').replace(/plugin\-/, '')
  }
}

module.exports.Service = class Service {
  constructor(lisa) {
    this.lisa = lisa
  }

  /**
   * Expose the application's logger directly on the Plugin for convenience.
   */
  get log() {
    return this.lisa.log
  }

  get _() {
    return this.lisa._
  }

  get i18n() {
    return this.lisa._
  }
}


module.exports.Controller = class Controller {
  constructor(lisa) {
    this.lisa = lisa
  }

  get log() {
    return this.lisa.log
  }

  get _() {
    return this.lisa._
  }

  get i18n() {
    return this.lisa._
  }
}


