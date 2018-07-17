/* eslint-disable class-methods-use-this,no-unused-vars */
class Plugin {
  constructor(name) {
    this.name = name;
  }

  getDependencies(config) {
    return [];
  }

  getHooks() {
    return null;
  }

  apply(ox) {
    throw new Error(`plugin ${this.name} need a 'apply' named function`);
  }
}
/* eslint-enable class-methods-use-this,,no-unused-vars */

export default Plugin;
