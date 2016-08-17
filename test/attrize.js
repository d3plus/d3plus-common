import {test} from "tape";
import {default as attrize} from "../src/attrize.js";
import {select} from "d3-selection";

test("attrize", assert => {

  const styles = {
    "width": "500px",
    "font-size": "12px"
  };

  const svg = select("body").append("svg");

  attrize(svg, styles);

  assert.equals(svg.attr("width"), "500px", "Basic Attribute");
  assert.equals(svg.attr("font-size"), "12px", "Hyphenated Attribute");
  assert.end();

});
