/**
    @function unique
    @desc ES5 implementation to reduce an Array of values to unique instances.
    @param {Array} arr The Array of objects to be filtered.
    @param {Function} [accessor] An optional accessor function used to extract data points from an Array of Objects.
    @example <caption>this</caption>
unique(["apple", "banana", "apple"]);
    @example <caption>returns this</caption>
["apple", "banana"]
*/
export default function(arr, accessor = d => d) {
  const values = arr.map(accessor);
  return arr.filter((d, i) => values.indexOf(accessor(d)) === i);
}
