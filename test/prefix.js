import {test} from "zora";
import {default as prefix} from "../src/prefix.js";

test("prefix", assert => {

  assert.equal(prefix(), "-webkit-", "Webkit");

});

export default test;
