import {test} from "zora";
import {default as unique} from "../src/unique.js";

test("unique", assert => {

  assert.equal(unique(["a", "a", "b"]).join(","), "a,b", "Strings");
  assert.equal(unique([1, 2, 1]).join(","), "1,2", "Numbers");

  const firstDate = new Date("1987/06/12");
  const secondDate = new Date("1987/06/12");
  assert.equal(unique([firstDate, secondDate]).join(","), firstDate.toString(), "Dates");

});

export default test;
