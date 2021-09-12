
import {Plugin, Driver} from '../index.js';
class TestPlugin extends Plugin {
  constructor(lisa) {
    super(lisa, {
      config: {},
      drivers: {
        MyDriver: class MyDriver extends Driver {

        },
      },
      bots: {
        'hue': {
          'name': 'Philips HUE lights',
          'freeStates': {},
        },
      },
      pkg: {
        name: 'lisa-plugin-test-lisa',
        version: '0.0.0',
      },
    });
  }
}

export default TestPlugin;
