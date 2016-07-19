import {test} from "tape";
import {default as stylize} from "../src/stylize.js";
import {select} from "d3-selection";

test("stylize", assert => {

  const styles = {
    "color": "red",
    "font-size": "12px"
  };

  const div = select("body").append("div");

  stylize(div, styles);

  assert.equals(div.style("color"), "rgb(255, 0, 0)", "Basic Style");
  assert.equals(div.style("font-size"), "12px", "Hyphenated Style");
  assert.end();

});
