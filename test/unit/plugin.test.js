import assert from 'assert';
import TestPlugin from '../fake.plugin.js';

// eslint-disable-next-line no-extend-native
String.prototype.toCamelCase = function() {
  return this.toLowerCase().replace(/(?:_|-)(.)/g, (match, group1) => {
    return group1.toUpperCase();
  });
};

describe('lisa-plugin unit', ()=> {
  const fakeLisa = {
    log: console.log,
    _: () => {
    },
    getChatBot: () => {
      return Promise.resolve();
    },
  };

  const plugin = new TestPlugin(fakeLisa);

  it('should return name in camel case', () => {
    assert.strictEqual(plugin.name, 'testLisa');
  });

  it('should return log function', () => {
    assert.strictEqual(plugin.log, console.log);
  });

  it('should have lisa instance', () => {
    assert(plugin.lisa);
  });

  it('should have api driver', () => {
    assert(plugin.drivers);
    assert(plugin.drivers.MyDriver);
    assert.strictEqual(plugin.drivers.MyDriver.log, console.log);
    assert.strictEqual(plugin.drivers.MyDriver._, fakeLisa._);
    assert.strictEqual(plugin.drivers.MyDriver.i18n, fakeLisa._);
    assert(plugin.drivers.MyDriver.plugin);
    assert.strictEqual(plugin.drivers.MyDriver.plugin.name, 'testLisa');
  });
});
