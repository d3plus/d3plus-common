import {merge, sum} from "d3-array";
import {keys} from "d3-collection";

/**
    @function merge
    @desc Combines an Array of Objects together and returns a new Object.
    @param {Array} objects The Array of objects to be merged together.
    @example <caption>this</caption>
merge([
  {"id": "foo", "group": "A", "value": 10},
  {"id": "bar", "group": "A", "value": 20}
]);
    @example <caption>returns this</caption>
{"id": ["bar", "foo"], "group": "A", "value": 30}
*/
export default function(objects) {

  const availableKeys = new Set(merge(objects.map((o) => keys(o)))),
        newObject = {};

  availableKeys.forEach((k) => {
    const values = objects.map((o) => o[k]);
    let value;
    if (values.map((v) => typeof v).indexOf("string") >= 0) {
      value = Array.from(new Set(values).values());
      if (value.length === 1) value = value[0];
    }
    else value = sum(values);
    newObject[k] = value;
  });

  return newObject;

}
