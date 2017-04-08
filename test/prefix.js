import zora from "zora";
import {default as prefix} from "../src/prefix.js";

export default zora()
  .test("prefix", assert => {

    assert.equal(prefix(), "-webkit-", "Webkit");

  });
