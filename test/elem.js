import test from "zora";
import {default as elem} from "../src/elem.js";

test("elem", assert => {

  const svg = elem("svg.className");
  assert.equal(svg.size(), 1, "Append");

});

export default test;
