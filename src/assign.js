import {default as isObject} from "./isObject";

/**
    @function assign
    @desc Determines if the object passed is the document or window.
    @param {Object} obj
    @private
*/
function validObject(obj) {
  if (typeof window === "undefined") return true;
  else return obj !== window && obj !== document;
}

/**
    @function assign
    @desc A deeply recursive version of `Object.assign`.
    @param {...Object} objects
    @example <caption>this</caption>
assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
    @example <caption>returns this</caption>
{id: "bar", deep: {group: "A", value: 20}}
*/
function assign(...objects) {

  const target = objects[0];
  for (let i = 1; i < objects.length; i++) {

    const source = objects[i];

    Object.keys(source).forEach(prop => {

      const value = source[prop];

      if (isObject(value) && validObject(value)) {
        if (target.hasOwnProperty(prop) && isObject(target[prop])) target[prop] = assign({}, target[prop], value);
        else target[prop] = assign({}, value);
      }
      else if (Array.isArray(value)) {

        if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {

          const targetArray = target[prop];

          value.forEach((sourceItem, itemIndex) => {

            if (itemIndex < targetArray.length) {
              const targetItem = targetArray[itemIndex];

              if (Object.is(targetItem, sourceItem)) return;

              if (isObject(targetItem) && isObject(sourceItem) || Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                targetArray[itemIndex] = assign({}, targetItem, sourceItem);
              }
              else targetArray[itemIndex] = sourceItem;

            }
            else targetArray.push(sourceItem);

          });
        }
        else target[prop] = value;

      }
      else target[prop] = value;

    });
  }

  return target;

}

export default assign;
