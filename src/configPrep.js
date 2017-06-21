/**
    @function configPrep
    @desc Preps a config object for d3plus data, and optionally bubbles up a specific nested type. When using this function, you must bind a d3plus class' `this` context.
    @param {Object} [config = this._shapeConfig] The configuration object to parse.
    @param {String} [type = "shape"] The event classifier to user for "on" events. For example, the default event type of "shape" will apply all events in the "on" config object with that key, like "click.shape" and "mouseleave.shape", in addition to any gloval events like "click" and "mouseleave".
    @param {String} [nest] An optional nested key to bubble up to the parent config level.
*/
export default function configPrep(config = this._shapeConfig, type = "shape", nest = false) {

  const newConfig = {duration: this._duration, on: {}};

  const wrapFunction = func => (d, i, s) => {
    while (d.__d3plus__ && d.data) {
      i = d.i;
      d = d.data;
    }
    return func(d, i, s);
  };

  const parseEvents = (newObj, on) => {

    for (const event in on) {

      if ({}.hasOwnProperty.call(on, event) && !event.includes(".") || event.includes(`.${type}`)) {

        newObj.on[event] = wrapFunction(on[event]);

      }

    }

  };

  const keyEval = (newObj, obj) => {

    for (const key in obj) {

      if ({}.hasOwnProperty.call(obj, key)) {

        if (key === "on") parseEvents(newObj, obj[key]);
        else if (typeof obj[key] === "function") {
          newObj[key] = wrapFunction(obj[key]);
        }
        else if (typeof obj[key] === "object" && !(obj instanceof Array)) {
          newObj[key] = {on: {}};
          keyEval(newObj[key], obj[key]);
        }
        else newObj[key] = obj[key];

      }

    }

  };

  keyEval(newConfig, config);
  if (this._on) parseEvents(newConfig, this._on);
  if (nest && config[nest]) keyEval(newConfig, config[nest]);

  return newConfig;

}
