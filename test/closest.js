import {test} from "tape";
import {default as closest} from "../src/closest.js";

test("closest", assert => {

  assert.equals(closest(9, [0, 10]), 10, "Closest Over");
  assert.equals(closest(1, [0, 10]), 0, "Closest Under");
  assert.equals(closest(1, undefined), void 0, "Undefined");
  assert.equals(closest(1, []), void 0, "Empty Array");
  assert.end();

});
