import {test} from "tape";
import {default as constant} from "../src/constant.js";

test("constant", assert => {

  assert.equals(constant(42)(), 42, "Number");
  assert.equals(constant("value")(), "value", "String");
  const arr = [1, 2, 3];
  assert.equals(constant(arr)(), arr, "Array");
  const obj = {foo: "bar"};
  assert.equals(constant(obj)(), obj, "Object");
  assert.end();

});
