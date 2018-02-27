import test from "zora";
import {default as uuid} from "../src/uuid.js";

test("uuid", assert => {

  assert.notEqual(uuid(), uuid(), "Unique Values");

});

export default test;
