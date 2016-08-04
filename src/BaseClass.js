/**
    @class BaseClass
    @desc An abstract class that contains some global methods and functionality.
*/
export default class BaseClass {

  constructor() {

    function s() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    this._uuid = `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
  }

  /**
      @memberof BaseClass
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
  */
  config(_) {
    if (arguments.length) {
      for (const k in _) if ({}.hasOwnProperty.call(_, k) && k in this) this[k](_[k]);
      return this;
    }
    else {
      const config = {};
      for (const k in this.prototype.constructor) if (k !== "config" && {}.hasOwnProperty.call(this, k)) config[k] = this[k]();
      return config;
    }
  }

}
