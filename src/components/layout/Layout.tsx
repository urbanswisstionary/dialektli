"use client"

import type { FC, PropsWithChildren } from "react"

import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-4">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
