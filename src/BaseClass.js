import assign from "./assign";
import isObject from "./isObject";
import uuid from "./uuid";
import RESET from "./RESET";

/**
    @desc Recursive function that resets nested Object configs.
    @param {Object} obj
    @param {Object} defaults
    @private
*/
function nestedReset(obj, defaults) {
  if (isObject(obj)) {
    for (const nestedKey in obj) {
      if ({}.hasOwnProperty.call(obj, nestedKey) && !nestedKey.startsWith("_")) {
        const defaultValue = defaults && isObject(defaults) ? defaults[nestedKey] : undefined;
        if (obj[nestedKey] === RESET) {
          obj[nestedKey] = defaultValue;
        }
        else if (isObject(obj[nestedKey])) {
          nestedReset(obj[nestedKey], defaultValue);
        }
      }
    }
  }
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
    this._locale = "en-US";
    this._on = {};
    this._uuid = uuid();
  }

  /**
      @memberof BaseClass
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
      @chainable
  */
  config(_) {
    if (!this._configDefault) {
      const config = {};
      for (const k in this.__proto__) {
        if (k.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(k)) {
          const v = this[k]();
          config[k] = isObject(v) ? assign({}, v) : v;
        }
      }
      this._configDefault = config;
    }
    if (arguments.length) {
      for (const k in _) {
        if ({}.hasOwnProperty.call(_, k) && k in this) {
          const v = _[k];
          if (v === RESET) {
            if (k === "on") this._on = this._configDefault[k];
            else this[k](this._configDefault[k]);
          }
          else {
            nestedReset(v, this._configDefault[k]);
            this[k](v);
          }
        }
      }
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
      @desc If *value* is specified, sets the locale to the specified string and returns the current class instance. This method supports the locales defined in [d3plus-format](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js). In another case, you can define an Object with a custom locale.
      @param {Object|String} [*value* = "en-US"]
      @chainable
      @example
      {
        separator: "",
        suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
        grouping: [3],
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        currency: ["$", ""]
      }
  */
  locale(_) {
    return arguments.length ? (this._locale = _, this) : this._locale;
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
