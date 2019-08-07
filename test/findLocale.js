import {test} from "zora";
import {default as findLocale} from "../src/findLocale.js";

test("findLocale", assert => {

  assert.equal(findLocale("en"), "en-US", "default country");

});

export default test;
