import test from "zora";
import {default as stylize} from "../src/stylize.js";
import {select} from "d3-selection";

test("stylize", assert => {

  const styles = {
    "color": "red",
    "font-size": "12px"
  };

  const div = select("body").append("div");

  stylize(div, styles);

  assert.equal(div.style("color"), "red", "Basic Style");
  assert.equal(div.style("font-size"), "12px", "Hyphenated Style");

});

export default test;
