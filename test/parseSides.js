import zora from "zora";
import {default as parseSides} from "../src/parseSides.js";

export default zora()
    .test("parseSides", assert => {

      assert.deepEqual(parseSides(""), {top: "", right: "", bottom: "", left: ""}, "No values");
      assert.deepEqual(parseSides("10"), {top: "10", right: "10", bottom: "10", left: "10"}, "Single value");
      assert.deepEqual(parseSides("10 20"), {top: "10", right: "20", bottom: "10", left: "20"}, "Two values");
      assert.deepEqual(parseSides("10 20 30"), {top: "10", right: "20", bottom: "30", left: "20"}, "Three values");
      assert.deepEqual(parseSides("10 20 30 40"), {top: "10", right: "20", bottom: "30", left: "40"}, "Four value");
      assert.deepEqual(parseSides("10 20 30 40 50"), {top: "10", right: "20", bottom: "30", left: "40"}, "More than four values");

    });
