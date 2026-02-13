"use client"

import type { FC, PropsWithChildren } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

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
