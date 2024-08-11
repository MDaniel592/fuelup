import './global.css'
import React from 'react'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="white" />
        <meta name="application-name" content="FuelUp.tech" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FuelUp.tech" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="og:title" content="FuelUp" />
        <link rel="shortcut icon" href="/images/logos/FuelUp.svg" />
        <title>FuelUp</title>
      </head>

      <html lang="en">
        <body className="w-fit mx-auto min-h-[80vh]">{children}</body>
      </html>
    </>
  )
}
