import {test} from "tape";
import {default as accessor} from "../src/accessor.js";

test("accessor", (assert) => {

  const obj = {"id": "test"};
  assert.equals(accessor("id")(obj), "test", "String");
  assert.end();

});
