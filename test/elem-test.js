import assert from "assert";
import {default as elem} from "../src/elem.js";
import it from "./jsdom.js";

it("elem", () => {

  const svg = elem("svg.className");
  assert.strictEqual(svg.size(), 1, "Append");

});
