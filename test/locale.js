import zora from "zora";
import {default as locale} from "../src/locale.js";

export default zora()
  .test("locale", assert => {

    assert.equal(locale.t("array.lowercase", {returnObjects: true}).length, 26, "Array Fallback");
    assert.equal(locale.t("array.lowercase", {lng: "es-ES", returnObjects: true}).length, 14, "Array Specific");

  });
