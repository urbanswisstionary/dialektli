"use client"

import { useSearchParams } from "next/navigation"

import { useRouter } from "@/i18n/navigation"

type Query = {
  [paramName: string]: string | string[] | number | number[] | null | undefined
}

export const setQueryOnPage = (
  router: ReturnType<typeof useRouter>,
  pathname: string,
  searchParams: ReturnType<typeof useSearchParams>,
  query: Query,
) => {
  const params = new URLSearchParams(searchParams.toString())

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      params.delete(key)
    } else if (Array.isArray(value)) {
      params.delete(key)
      value.forEach((v) => params.append(key, String(v)))
    } else {
      params.set(key, String(value))
    }
  })

  const queryString = params.toString()
  const url = queryString ? `${pathname}?${queryString}` : pathname

  router.replace(url, { scroll: false })
}
