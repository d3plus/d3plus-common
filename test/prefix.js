import {test} from "tape";
import {default as prefix} from "../src/prefix.js";

test("prefix", assert => {

  assert.equals(prefix(), "-webkit-", "Webkit");
  assert.end();

});
