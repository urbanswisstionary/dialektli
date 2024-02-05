import { omit } from "lodash"
import { Url } from "next/dist/shared/lib/router/router"
import { NextRouter } from "next/router"

type QueryParameter = string | string[] | number | number[] | never[] // pass [] to remove query

export const setQueryOnPage = (
  router: NextRouter,
  query: {
    [paramName: string]: QueryParameter
  },
) => {
  const url: Url = {
    pathname: router.pathname,
    query: { ...router.query, ...query },
  }
  const as: Url = {
    pathname: router.asPath?.split("?")[0],
    query: { ...omit(router.query, ["slug"]), ...query },
  }
  router.replace(url, as, { shallow: true, scroll: false })
}
