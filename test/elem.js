import zora from "zora";
import {default as elem} from "../src/elem.js";

export default zora()
  .test("elem", assert => {

    const svg = elem("svg.className");
    assert.equal(svg.size(), 1, "Append");

  });
