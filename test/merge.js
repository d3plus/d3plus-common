import test from "zora";
import {default as merge} from "../src/merge.js";

test("merge", assert => {

  const obj = merge([
    {
      id: "foo", group: "A", value: 10, agg: 1, links: [1, 2],
      bool: false, undef: undefined, null: null, missing: 42
    },
    {
      id: "bar", group: "A", value: 20, agg: 1, links: [1, 3],
      bool: false, undef: undefined, null: null
    }
  ], {agg: a => a[0]});

  assert.equal(obj.group, "A", "Unique String");
  assert.ok(obj.links.length === 3 && obj.links[0] === 1 && obj.links[1] === 2 && obj.links[2] === 3, "Multiple Arrays");
  assert.ok(obj.id.length === 2 && obj.id[0] === "foo" && obj.id[1] === "bar", "Multiple Strings");
  assert.equal(obj.value, 30, "Number Summation");
  assert.equal(obj.agg, 1, "Custom Aggregation");
  assert.equal(obj.bool, false, "False Summation");
  assert.equal(obj.undef, void 0, "Undefined Summation");
  assert.equal(obj.null, null, "Null Summation");
  assert.equal(obj.missing, 42, "Missing Summation");

});

export default test;
