const defaultLocale = /** @type {"de" | "fr" | "en"} */ ("de")
const locales = /** @type {(typeof defaultLocale)[]} */ (["de", "fr", "en"])

const defaultNS = /** @type {"common" | "tos"| "privacyPolicy"}*/ ("common")
const namespaces = /** @type {(typeof defaultNS)[]} */ ([
  "common",
  "tos",
  "privacyPolicy",
])

module.exports = {
  i18n: {
    defaultLocale,
    locales: locales,
  },
  fallbackLng: defaultLocale,
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",

  ns: namespaces,
  defaultNS,
  debug: process.env.NODE_ENV === "development",
}
