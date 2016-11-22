import {test} from "tape";
import {default as isObject} from "../src/isObject.js";

test("isObject", assert => {

  assert.equals(isObject("id"), false, "String");
  assert.equals(isObject(42), false, "Number");
  assert.equals(isObject([1, 2, 3]), false, "Array");
  assert.equals(isObject(null), false, "null");
  assert.equals(isObject(void 0), false, "undefined");
  assert.equals(isObject(true), false, "true");
  assert.equals(isObject(false), false, "false");
  assert.equals(isObject({id: 1}), true, "Object");
  assert.end();

});
