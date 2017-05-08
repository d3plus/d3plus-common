import i18next from "i18next";

import enUS from "./locales/en-US/translation.json";
import esES from "./locales/es-ES/translation.json";

export default i18next.init({
  fallbackLng: "en-US",
  defaultNS: "d3plus",
  fallbackNS: "d3plus",
  initImmediate: false,
  ns: "d3plus",
  resources: {
    "en-US": {translation: enUS},
    "es-ES": {translation: esES}
  }
});
