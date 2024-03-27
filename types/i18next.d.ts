import "i18next"
import common from "../public/locales/de/common.json"
import tos from "../public/locales/de/tos.json"
import privacyPolicy from "../public/locales/de/privacyPolicy.json"
import about from "../public/locales/de/about.json"
import { defaultNS } from "../next-i18next.config"

interface Resources {
  common: typeof common
  tos: typeof tos
  privacyPolicy: typeof privacyPolicy
  about: typeof about
}

declare module "i18next" {
  export interface CustomTypeOptions {
    defaultNS: defaultNS
    resources: Resources
  }
}
