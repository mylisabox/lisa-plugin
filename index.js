'use strict'

const merge = require('lodash.merge')
const mapValues = require('lodash.mapvalues')
const isPlainObject = require('lodash.isplainobject')

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

    if (!plugin) {
      throw new Error('lisa-plugin should be extend and plugin config should be set on constructor')
    }

    plugin = merge({
      config: {},
      drivers: {},
      bots: {}
    }, plugin)

    Object.defineProperties(this, {
      pkg: {
        value: Object.freeze(plugin.pkg),
        enumerable: false
      },
      config: {
        value: plugin.config,
        enumerable: false
      },
      bots: {
        value: plugin.bots,
        enumerable: false
      }
    })
    this.drivers = this._bindMethods(lisa, plugin, 'drivers')
  }

  /**
   * Bind the context of API resource methods.
   * @param lisa
   * @param plugin
   * @param resource
   * @returns {Object}
   * @private
   */
  _bindMethods(lisa, plugin, resource) {
    return mapValues(plugin[resource], (Resource, resourceName) => {
      if (isPlainObject(Resource)) {
        throw new Error(`${resourceName} should be a class. It is a regular object`)
      }

      return new Resource(lisa, this)
    })
  }

  /**
   * Initialisation of your plugin
   * Called once, when plugin is loaded
   * @returns Promise
   */
  init() {
    const driversInit = []
    for (let driverName in this.drivers) {
      driversInit.push(this.drivers[driverName].init())
    }
    return Promise.all(driversInit)
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
    const driversUnload = []
    for (let driverName in this.drivers) {
      driversUnload.push(this.drivers[driverName].unload())
    }
    return Promise.all(driversUnload)
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
    return this.pkg.name.replace(/lisa-/, '').replace(/plugin-/, '').toCamelCase()
  }

  /**
   * Return the name of this Plugin. By default, this is the name of the
   * npm module (in package.json).
   *
   * @return String
   */
  get fullName() {
    return this.pkg.name
  }

  /**
   * Return the version of this Plugin. By default, this is the version of the
   * npm module (in package.json).
   *
   * @return String
   */
  get version() {
    return this.pkg.version
  }
}

module.exports.Driver = class Driver {
  constructor(lisa, plugin) {
    this.lisa = lisa
    this.plugin = plugin
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

  /**
   * Init the driver, call once when driver is loaded
   * @returns {Promise}
   */
  init() {
    return Promise.resolve()
  }

  /**
   * UI form submitted by the user and need to be saved
   * @param deviceData from the UI form
   * @returns {Promise}
   */
  saveDevice(deviceData) {
    return this.lisa.createOrUpdateDevices(deviceData)
  }

  /**
   * Retrieve list of available devices
   * @returns {Promise.<Array>}
   */
  getDevices() {
    return Promise.resolve([])
  }

  /**
   * Data required by front UI
   * @param devices to fill data
   * @returns {Promise}
   */
  getDevicesData(devices) {
    return Promise.resolve(devices)
  }

  /**
   * Set new value to a device
   * @param device who has changed
   * @param key of the changed value
   * @param newValue
   * @returns {Promise}
   */
  setDeviceValue(device, key, newValue) {
    return Promise.resolve()
  }

  /**
   * Set new value to multiple devices at once
   * @param devices who has changed
   * @param key of the changed value
   * @param newValue
   * @returns Promise
   */
  setDevicesValue(devices, key, newValue) {
    return Promise.resolve()
  }

  unload() {
    return Promise.resolve()
  }

}
