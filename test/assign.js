import zora from "zora";
import {default as assign} from "../src/assign.js";

export default zora()
  .test("assign", assert => {

    const obj = assign(
      {id: "foo", deep: {group: "A"}},
      {id: "bar", deep: {value: 20}},
      {deep: {group: "B"}, other: 2}
    );

    assert.equal(obj.id, "bar", "base value");
    assert.equal(obj.deep.value, 20, "deep value");
    assert.equal(obj.deep.group, "B", "deep value overwrite");

  });
