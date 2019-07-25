import {all as localeList} from "locale-codes";
const locales = localeList.filter(d => d.location && d["iso639-1"]);
const defaultLocales = {
  ar: "ar-SA",
  ca: "ca-ES",
  da: "da-DK",
  en: "en-US",
  ko: "ko-KR",
  pa: "pa-IN",
  pt: "pt-BR",
  sv: "sv-SE"
};

/**
 * Converts a 2-digit language into a full language-LOCATION locale.
 * @param {String} locale
 */
export default function(locale) {
  if (typeof locale !== "string" || locale.length === 5) return locale;
  if (defaultLocales[locale]) return defaultLocales[locale];
  const list = locales.filter(d => d["iso639-1"] === locale);
  if (!list.length) return locale;
  else if (list.length === 1) return list[0].tag;
  else if (list.find(d => d.tag === `${locale}-${locale.toUpperCase()}`)) return `${locale}-${locale.toUpperCase()}`;
  else return list[0].tag;
}
