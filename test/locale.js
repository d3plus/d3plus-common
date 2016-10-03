import {test} from "tape";
import {default as locale} from "../src/locale.js";

test("locale", assert => {

  assert.equals(locale.t("array.lowercase", {returnObjects: true}).length, 26, "Array Fallback");
  assert.equals(locale.t("array.lowercase", {lng: "es-ES", returnObjects: true}).length, 14, "Array Specific");
  assert.end();

});
