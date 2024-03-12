import "i18next"
import type common from "../public/locales/de/common.json"
import type tos from "../public/locales/de/tos.json"
import type privacyPolicy from "../public/locales/de/privacyPolicy.json"
import { defaultNS } from "../next-i18next.config"

interface Resources {
  common: typeof common
  tos: typeof tos
  privacyPolicy: typeof privacyPolicy
}

declare module "i18next" {
  export interface CustomTypeOptions {
    defaultNS: defaultNS
    resources: Resources
  }
}
