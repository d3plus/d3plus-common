import {test} from "tape";
import {default as BaseClass} from "../src/BaseClass.js";

test("BaseClass", assert => {

  const one = new BaseClass(), two = new BaseClass();
  assert.test(one._uuid !== two._uuid, "_uuid");
  assert.end();

});
