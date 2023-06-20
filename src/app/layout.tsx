import "./globals.css"

import { Footer, Nav } from "@/components"

import { GoogleAnalytics } from "@/components/common/"
import { Inter } from "next/font/google"
import { Metadata } from "next"
import clsx from "clsx"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "Medusa Inventory Module Demo",
    default: "Medusa Inventory Module Demo",
  },
  authors: [
    {
      name: "Medusa",
      url: "@medusajs",
    },
  ],
  description:
    "Learn how to use the Medusa Inventory and Stock Location Modules in Next.js functions to create a custom experience in your storefront. Discover the benefits of running the Modules in a serverless environment and get started building today.",
  openGraph: {
    title: "Medusa Inventory Module Demo",
    siteName: "Medusa Inventory Module Demo",
    description:
      "Learn how to use the Medusa Inventory and Stock Location Modules in Next.js functions to create a custom experience in your storefront. Discover the benefits of running the Modules in a serverless environment and get started building today.",
    type: "website",
    images: "/reservation-demo-thumbnail.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medusa Inventory Module Demo",
    description:
      "Learn how to use the Medusa Inventory and Stock Location Modules in Next.js functions to create a custom experience in your storefront. Discover the benefits of running the Modules in a serverless environment and get started building today.",
    creator: "@medusajs",
    images: [
      {
        url: "/reservation-demo-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Medusa Inventory Module Demo",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body
        className={clsx(
          inter.className,
          "dark:bg-base-dark bg-base-light text-base-light dark:text-base-dark min-h-screen"
        )}
      >
        <GoogleAnalytics />
        <Nav />
        <main className="pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
