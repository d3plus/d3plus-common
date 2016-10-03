import i18next from "i18next";

import enUS from "./locales/en-US/translation.json";
import esES from "./locales/es-ES/translation.json";

export default i18next.init({
  fallbackLng: "en-US",
  initImmediate: false,
  resources: {
    "en-US": {translation: enUS},
    "es-ES": {translation: esES}
  }
});
