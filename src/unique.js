/**
    @function unique
    @desc ES5 implementation to reduce an Array of values to unique instances.
    @param {Array} objects The Array of objects to be filtered.
    @example <caption>this</caption>
unique(["apple", "banana", "apple"]);
    @example <caption>returns this</caption>
["apple", "banana"]
*/
export default function(arr) {
  return arr.filter((k, i, a) => a.indexOf(k) === i);
}
