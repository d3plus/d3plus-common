/**
    @function s
    @desc Returns 4 random characters, used for constructing unique identifiers.
    @private
*/
function s() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}


/**
    @class BaseClass
    @summary An abstract class that contains some global methods and functionality.
*/
export default class BaseClass {

  /**
      @memberof BaseClass
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {
    this._on = {};
    this._uuid = `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
  }

  /**
      @memberof BaseClass
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
      @chainable
  */
  config(_) {
    if (arguments.length) {
      for (const k in _) if ({}.hasOwnProperty.call(_, k) && k in this) this[k](_[k]);
      return this;
    }
    else {
      const config = {};
      for (const k in this.__proto__) if (k.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(k)) config[k] = this[k]();
      return config;
    }
  }

  /**
      @memberof BaseClass
      @desc Adds or removes a *listener* to each object for the specified event *typenames*. If a *listener* is not specified, returns the currently assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
      @param {String} [*typenames*]
      @param {Function} [*listener*]
      @chainable
      @example <caption>By default, listeners apply globally to all objects, however, passing a namespace with the class name gives control over specific elements:</caption>
new Plot
  .on("click.Shape", function(d) {
    console.log("data for shape clicked:", d);
  })
  .on("click.Legend", function(d) {
    console.log("data for legend clicked:", d);
  })
  */
  on(_, f) {
    return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
  }

}
