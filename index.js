'use strict'

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
  construtor(lisa, plugin) {
    this.lisa = lisa

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
    return this.pkg.name.replace(/lisa\-/, '')
  }
}
