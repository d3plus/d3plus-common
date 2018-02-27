import zora from "zora";
import {default as expandDirectionalCssShorthand} from "../src/expandDirectionalCssShorthand.js";

export default zora()
    .test("expandDirectionalCssShorthand", assert => {

      assert.deepEqual(expandDirectionalCssShorthand(""), {top: "", right: "", bottom: "", left: ""}, "No values");
      assert.deepEqual(expandDirectionalCssShorthand("10"), {top: "10", right: "10", bottom: "10", left: "10"}, "Single value");
      assert.deepEqual(expandDirectionalCssShorthand("10 20"), {top: "10", right: "20", bottom: "10", left: "20"}, "Two values");
      assert.deepEqual(expandDirectionalCssShorthand("10 20 30"), {top: "10", right: "20", bottom: "30", left: "20"}, "Three values");
      assert.deepEqual(expandDirectionalCssShorthand("10 20 30 40"), {top: "10", right: "20", bottom: "30", left: "40"}, "Four value");
      assert.deepEqual(expandDirectionalCssShorthand("10 20 30 40 50"), {top: "10", right: "20", bottom: "30", left: "40"}, "More than four values");

    });
