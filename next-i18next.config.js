const defaultLocale = /** @type {"en" | "de"} */ ("en")
const locales = /** @type {(typeof defaultLocale)[]} */ (["en", "de", "fr"])

module.exports = {
  i18n: {
    defaultLocale,
    locales: locales,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",

  ns: ["common"],
  debug: process.env.NODE_ENV === "development",
}
