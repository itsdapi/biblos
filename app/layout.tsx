import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import "reflect-metadata";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biblos在线书店",
  description: "基于NextJS, NextAuth, Oracle的在线书店",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <AntdRegistry>
            <Toaster position="top-center"/>
            <main>{children}</main>
          </AntdRegistry>
        </NextUIProvider>
      </body>
    </html>
  );
}
