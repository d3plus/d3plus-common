import zora from "zora";
import {default as stylize} from "../src/stylize.js";
import {select} from "d3-selection";

export default zora()
  .test("stylize", assert => {

    const styles = {
      "color": "red",
      "font-size": "12px"
    };

    const div = select("body").append("div");

    stylize(div, styles);

    assert.equal(div.style("color"), "rgb(255, 0, 0)", "Basic Style");
    assert.equal(div.style("font-size"), "12px", "Hyphenated Style");

  });
