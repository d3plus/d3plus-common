import {test} from "zora";
import {default as assign} from "../src/assign.js";

test("assign", assert => {

  const a = {id: "foo", deep: {group: "A"}},
        b = {id: "bar", deep: {value: 20}},
        c = {deep: {group: "B"}, other: 2};

  const obj = assign({}, a, b, c);

  assert.equal(obj.id, "bar", "base value");
  assert.equal(obj.deep.value, 20, "deep value");
  assert.equal(obj.deep.group, "B", "deep value overwrite");
  assert.equal(a.deep.group, "A", "non-destructive");
  assert.equal(a.deep.value, undefined, "non-additive");
  assert.equal(assign(a, undefined, null, false, "string", 42), a, "filters out non-objects");

});

export default test;
