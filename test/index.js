'use strict'

const lisaApp = require('lisabox')
const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(lisaApp)
  return global.app.start().catch(global.app.stop)
})

after(() => {
  return global.app.stop()
})
