import {test} from "tape";
import {default as merge} from "../src/merge.js";

test("merge", (assert) => {

  const obj = merge([
    {"id": "foo", "group": "A", "value": 10},
    {"id": "bar", "group": "A", "value": 20}
  ]);

  assert.equals(obj.group, "A", "Unique String");
  assert.true(obj.id[0] === "foo" && obj.id[1] === "bar", "Multiple Strings");
  assert.equals(obj.value, 30, "Number Summation");
  assert.end();

});
