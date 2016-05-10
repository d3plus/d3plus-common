/**
    @function accessor
    @desc Wraps an object key in a simple accessor function.
    @param {String} key The key to be returned from each Object passed to the function.
    @example <caption>this</caption>
constant("id");
    @example <caption>returns this</caption>
function(d) {
  return d["id"];
}
*/
export default function(key) {
  return function constant(d) {
    return d[key];
  };
}
