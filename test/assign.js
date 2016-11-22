import {test} from "tape";
import {default as assign} from "../src/assign.js";

test("assign", assert => {

  const obj = assign(
    {id: "foo", deep: {group: "A"}},
    {id: "bar", deep: {value: 20}},
    {deep: {group: "B"}, other: 2}
  );

  assert.equals(obj.id, "bar", "base value");
  assert.equals(obj.deep.value, 20, "deep value");
  assert.equals(obj.deep.group, "B", "deep value overwrite");
  assert.end();

});
