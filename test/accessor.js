import zora from "zora";
import {default as accessor} from "../src/accessor.js";

export default zora()
  .test("accessor", assert => {

    const obj = {id: "test", null: null, zero: 0, false: false};
    assert.equal(accessor("id")(obj), "test", "String");
    assert.equal(accessor("null")(obj), null, "null");
    assert.equal(accessor("zero")(obj), 0, "0");
    assert.equal(accessor("false")(obj), false, "false");

    assert.equal(accessor("id", "default")(obj), "test", "String w/ default");
    assert.equal(accessor("null", "default")(obj), null, "null w/ default");
    assert.equal(accessor("zero", "default")(obj), 0, "0 w/ default");
    assert.equal(accessor("false", "default")(obj), false, "false w/ default");

    assert.equal(accessor("missing", "default")(obj), "default", "String as default");
    assert.equal(accessor("missing", null)(obj), null, "null as default");
    assert.equal(accessor("missing", 0)(obj), 0, "0 as default");
    assert.equal(accessor("missing", false)(obj), false, "false as default");

  });
