import test from "zora";
import {default as attrize} from "../src/attrize.js";
import {select} from "d3-selection";

test("attrize", assert => {

  const styles = {
    "width": "500px",
    "font-size": "12px"
  };

  const svg = select("body").append("svg");

  attrize(svg, styles);

  assert.equal(svg.attr("width"), "500px", "Basic Attribute");
  assert.equal(svg.attr("font-size"), "12px", "Hyphenated Attribute");

});

export default test;
