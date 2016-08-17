import {test} from "tape";
import {default as elem} from "../src/elem.js";

test("elem", assert => {

  const svg = elem("svg.className");

  assert.equals(svg.size(), 1, "Append");
  assert.end();

});
