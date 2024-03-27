const defaultLocale = /** @type {"de" | "fr" | "en"} */ ("de")
const locales = /** @type {(typeof defaultLocale)[]} */ (["de", "fr", "en"])

const defaultNS = /** @type {"common" | "tos" | "privacyPolicy" | "about"}*/ (
  "common"
)
const namespaces = /** @type {(typeof defaultNS)[]} */ ([
  "common",
  "tos",
  "privacyPolicy",
  "about",
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
