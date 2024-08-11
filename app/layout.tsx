import './global.css'
import Head from 'next/head'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <meta name="application-name" content="FuelUp.tech" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FuelUp.tech" />
        <meta name="description" content="Tracker for PC parts and consoles" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* <meta name="theme-color" content="#FFFFFF" /> */}
        <meta name="og:title" content="FuelUp" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="shortcut icon" href="/images/logos/FuelUp.svg" />
        <title>FuelUp</title>
      </Head>


      <body className="w-fit mx-auto min-h-[80vh]">{children}</body>
    </html>
  )
}