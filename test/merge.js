import {test} from "tape";
import {default as merge} from "../src/merge.js";

test("merge", assert => {

  const obj = merge([
    {id: "foo", group: "A", value: 10, agg: 1, links: [1, 2]},
    {id: "bar", group: "A", value: 20, agg: 1, links: [1, 3]}
  ], {agg: a => a[0]});

  assert.equals(obj.group, "A", "Unique String");
  assert.true(obj.links.length === 3 && obj.links[0] === 1 && obj.links[1] === 2 && obj.links[2] === 3, "Multiple Arrays");
  assert.true(obj.id.length === 2 && obj.id[0] === "foo" && obj.id[1] === "bar", "Multiple Strings");
  assert.equals(obj.value, 30, "Number Summation");
  assert.equals(obj.agg, 1, "Custom Aggregation");
  assert.end();

});
