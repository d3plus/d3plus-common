import zora from "zora";
import {default as BaseClass} from "../src/BaseClass.js";

export default zora()
  .test("BaseClass", assert => {

    const one = new BaseClass(), two = new BaseClass();
    assert.ok(one._uuid !== two._uuid, "_uuid");

  });
