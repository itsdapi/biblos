import React from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className={"min-h-screen bg-muted/50"}>
        <div className={"container mx-auto pt-5"}>
          {children}
        </div>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}
