let val = undefined;

/**
    @function prefix
    @desc Returns the appropriate CSS vendor prefix, given the current browser.
*/
export default function() {
  if (val !== void 0) return val;
  if ("-webkit-transform" in document.body.style) val = "-webkit-";
  else if ("-moz-transform" in document.body.style) val = "-moz-";
  else if ("-ms-transform" in document.body.style) val = "-ms-";
  else if ("-o-transform" in document.body.style) val = "-o-";
  else val = "";
  return val;
}
