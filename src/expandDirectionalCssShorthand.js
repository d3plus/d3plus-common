/**
 @function expandDirectionalCssShorthand
 @desc Converts a string of directional CSS shorthand values into an object with the values expanded.
 @param {String} shorthand The CSS shorthand string to expand.
 */
export default function(shorthand) {
  let values = shorthand.split(/\s+/);

  if (values.length === 1) values = [values[0], values[0], values[0], values[0]];
  else if (values.length === 2) values = values.concat(values);
  else if (values.length === 3) values.push(values[1]);

  return [
    "top",
    "right",
    "bottom",
    "left"
  ].reduce((acc, direction, i) => {
    acc[direction] = values[i];
    return acc;
  }, {});
}
