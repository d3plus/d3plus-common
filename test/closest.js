import {test} from "zora";
import {default as closest} from "../src/closest.js";

test("closest", assert => {

  assert.equal(closest(9, [0, 10]), 10, "Closest Over");
  assert.equal(closest(1, [0, 10]), 0, "Closest Under");
  assert.equal(closest(1, undefined), void 0, "Undefined");
  assert.equal(closest(1, []), void 0, "Empty Array");

});

export default test;
