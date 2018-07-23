import test from "zora";
import {default as isObject} from "../src/isObject.js";

test("isObject", assert => {

  assert.equal(isObject("id"), false, "String");
  assert.equal(isObject(42), false, "Number");
  assert.equal(isObject([1, 2, 3]), false, "Array");
  assert.equal(isObject(null), false, "null");
  assert.equal(isObject(void 0), false, "undefined");
  assert.equal(isObject(true), false, "true");
  assert.equal(isObject(false), false, "false");
  assert.equal(isObject(window), false, "window");
  assert.equal(isObject(document), false, "document");
  assert.equal(isObject(document.body), false, "DOM element");
  assert.equal(isObject({id: 1}), true, "Object");

});

export default test;
