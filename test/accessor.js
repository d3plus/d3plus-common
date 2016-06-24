import {test} from "tape";
import {default as accessor} from "../src/accessor.js";

test("accessor", (assert) => {

  const obj = {id: "test", null: null, zero: 0, false: false};
  assert.equals(accessor("id")(obj), "test", "String");
  assert.equals(accessor("null")(obj), null, "null");
  assert.equals(accessor("zero")(obj), 0, "0");
  assert.equals(accessor("false")(obj), false, "false");

  assert.equals(accessor("id", "default")(obj), "test", "String w/ default");
  assert.equals(accessor("null", "default")(obj), null, "null w/ default");
  assert.equals(accessor("zero", "default")(obj), 0, "0 w/ default");
  assert.equals(accessor("false", "default")(obj), false, "false w/ default");

  assert.equals(accessor("missing", "default")(obj), "default", "String as default");
  assert.equals(accessor("missing", null)(obj), null, "null as default");
  assert.equals(accessor("missing", 0)(obj), 0, "0 as default");
  assert.equals(accessor("missing", false)(obj), false, "false as default");
  assert.end();

});
