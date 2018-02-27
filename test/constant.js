import test from "zora";
import {default as constant} from "../src/constant.js";

test("constant", assert => {

  assert.equal(constant(42)(), 42, "Number");
  assert.equal(constant("value")(), "value", "String");
  const arr = [1, 2, 3];
  assert.equal(constant(arr)(), arr, "Array");
  const obj = {foo: "bar"};
  assert.equal(constant(obj)(), obj, "Object");

});

export default test;
