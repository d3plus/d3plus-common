import {merge, sum} from "d3-array";
import {keys} from "d3-collection";

/**
    @function merge
    @desc Combines an Array of Objects together and returns a new Object.
    @param {Array} objects The Array of objects to be merged together.
    @param {Object} aggs An object containing specific aggregation methods (functions) for each key type. By default, numbers are summed and strings are returned as an array of unique values.
    @example <caption>this</caption>
merge([
  {id: "foo", group: "A", value: 10},
  {id: "bar", group: "A", value: 20}
]);
    @example <caption>returns this</caption>
{id: ["bar", "foo"], group: "A", value: 30}
*/
export default function(objects, aggs = {}) {

  const availableKeys = new Set(merge(objects.map(o => keys(o)))),
        newObject = {};

  availableKeys.forEach(k => {
    const values = objects.map(o => o[k]);
    let value;
    if (aggs[k]) value = aggs[k](values);
    else if (values.map(v => typeof v).indexOf("string") >= 0) {
      value = Array.from(new Set(values));
      if (value.length === 1) value = value[0];
    }
    else value = sum(values);
    newObject[k] = value;
  });

  return newObject;

}
