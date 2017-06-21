import zora from "zora";
import {default as uuid} from "../src/uuid.js";

export default zora()
  .test("uuid", assert => {

    assert.notEqual(uuid(), uuid(), "Unique Values");

  });
