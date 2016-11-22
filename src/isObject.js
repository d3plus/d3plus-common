/**
    @function isObject
    @desc Detects if a variable is a javascript Object.
    @param {*} item
*/
export default function(item) {
  return item && typeof item === "object" && !Array.isArray(item) && item !== void 0 ? true : false;
}
