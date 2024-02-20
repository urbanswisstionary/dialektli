import { omit } from "lodash"
import { Url } from "next/dist/shared/lib/router/router"
import { NextRouter } from "next/router"

type Query = {
  [paramName: string]: string | string[] | number | number[] | null // pass null to remove query
}
/**
 * Sets or modifies query parameters on the current page URL using Next.js router.
 *
 * @param router - The Next.js router instance.
 * @param query - An object representing query parameters to be added or modified.
 *                Each key is the parameter name, and the value can be a string, string array,
 *                number, number array, or null to remove the query parameter.
 */
export const setQueryOnPage = (router: NextRouter, query: Query) => {
  // Replace null values with an empty array
  const sanitizedQuery = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      value === null ? [] : value,
    ]),
  )

  // Create a new URL object with the updated query parameters
  const url: Url = {
    pathname: router.pathname,
    query: { ...router.query, ...sanitizedQuery },
  }

  // Create a new URL object for the `as` property (used for server-side rendering)
  const as: Url = {
    // Extract the pathname from the current `asPath` and remove the query string
    pathname: router.asPath?.split("?")[0],
    // Merge the existing query parameters excluding "slug" with the new parameters
    query: { ...omit(router.query, ["slug"]), ...sanitizedQuery },
  }
  router.replace(url, as, { shallow: true, scroll: false })
}
