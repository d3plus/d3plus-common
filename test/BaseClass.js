import test from "zora";
import {default as BaseClass} from "../src/BaseClass.js";

test("BaseClass", assert => {

  const one = new BaseClass(), two = new BaseClass();
  assert.ok(one._uuid !== two._uuid, "_uuid");

});

export default test;
