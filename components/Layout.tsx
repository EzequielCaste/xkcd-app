import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer"

export function Layout ({ children }: { 
  children: ReactNode
}) {
  return (
    <>
      <Header />

      <main className="max-w-xl m-auto">
        {children}
      </main>

      <Footer />
    </>
  )
}