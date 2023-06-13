import "./globals.css"

import { Footer, Nav } from "@/components"

import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import clsx from "clsx"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    template: "Medusa Inventory Module Demo",
    default: "Medusa Inventory Module Demo",
  },
  description:
    "Learn how to use the Medusa Inventory and Stock Location Modules in Next.js functions to create a custom experience in your storefront. Discover the benefits of running the Modules in a serverless environment and get started building today.",
  openGraph: {
    title: "Medusa Inventory Module Demo",
    siteName: "Medusa Inventory Module Demo",
    description:
      "Learn how to use the Medusa Inventory and Stock Location Modules in Next.js functions to create a custom experience in your storefront. Discover the benefits of running the Modules in a serverless environment and get started building today.",
    type: "website",
    author: "MedusaJS",
    images: "/product-module-demo-thumbnail.jpg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "dark:bg-base-dark bg-base-light text-base-light dark:text-base-dark min-h-screen"
        )}
      >
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <Nav />
        <Toaster
          containerStyle={{
            top: 74,
            left: 24,
            bottom: 24,
            right: 24,
          }}
        />
        <main className="pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
