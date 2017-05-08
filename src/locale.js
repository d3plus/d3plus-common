import i18next from "i18next";

const namespace = "d3plus";
import enUS from "./locales/en-US/d3plus.json";
import esES from "./locales/es-ES/d3plus.json";

export default i18next.init({
  fallbackLng: "en-US",
  defaultNS: namespace,
  fallbackNS: namespace,
  initImmediate: false,
  ns: namespace,
  resources: {
    "en-US": {[namespace]: enUS},
    "es-ES": {[namespace]: esES}
  }
});
