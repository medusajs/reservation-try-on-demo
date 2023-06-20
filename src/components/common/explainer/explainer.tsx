"use client"

import React, { useEffect, useState } from "react"

import { DemoSection } from "./sections/demo"
import { Divider } from "../divider"
import { ExplainerHeader } from "./sections/header"
import { ExplainerHero } from "./components/hero"
import { FAQ } from "./sections/faq"
import { FiltersVideoSection } from "./sections/filters-video"
import { ListingInventoryLevelsSection } from "./sections/list-inventory-levels"
import { ListingLocationsSection } from "./sections/list-locations"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { ProductDataSection } from "./sections/product-data"
import { ProductProvider } from "@/lib/context/product-context"
import { Spinner } from "../spinner"
import { WhatIsAReservationSection } from "./sections/what-is-a-reservation"
import { client } from "@/lib/data/medusa"

export const ExplainerBody = () => {
  return (
    <div className="w-full h-full px-1.5 pb-20">
      <ExplainerHero />
      <div className="flex flex-col w-full items-center">
        <div className="w-10/12 lg:w-2/3 xl:w-1/2">
          <ExplainerContent />
          <Divider />
          <FAQ />
        </div>
      </div>
    </div>
  )
}

const ExplainerContent = () => {
  const [data, setData] = useState<PricedProduct | null>(null)
  const [loading, setLoading] = useState(false)

  async function listProducts(): Promise<PricedProduct[]> {
    setLoading(true)

    const { regions } = await client.regions.list()

    const { products } = await client.products.list({
      region_id: regions[0].id,
      limit: 1,
      expand: `variants,variants.options,variants.prices,variants.inventory_items,options,options.values`,
    })

    setData(products[0])
    setLoading(false)
    return products
  }

  useEffect(() => {
    listProducts()
  }, [])

  return (
    <div className="flex flex-col w-full items-start mb-20">
      <ExplainerHeader />
      <Divider />
      {loading && (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      )}
      {data && <ExplainerPoints product={data} />}
    </div>
  )
}

type ExplainerPointsProps = {
  product: PricedProduct
}
const ExplainerPoints: React.FC<ExplainerPointsProps> = ({ product }) => {
  return (
    <ProductProvider product={product}>
      <h3 className=" text-base-light dark:text-base-dark text-headers-h3 sm:pl-6">
        How to implement Book Try-On with Medusa
      </h3>
      <div className="w-full flex pt-4 sm:pl-2 sm:overflow-x-scroll sm:pr-5">
        <div className="min-h-full w-[1px] mr-6 bg-border-light dark:bg-border-dark sm:flex-col justify-end hidden sm:flex">
          <div className="h-[200px] w-full bg-gradient-to-t from-white dark:from-[#1C1C1C]" />
        </div>
        <div className="flex flex-col w-full sm:w-[calc(100%-25px)] ">
          <ProductDataSection product={product} />
          <Divider />
          <ListingInventoryLevelsSection />
          <Divider />
          <ListingLocationsSection product={product} />
          <Divider />
          <WhatIsAReservationSection />
          <Divider />
          <DemoSection product={product} />
          <Divider />
          <FiltersVideoSection />
        </div>
      </div>
    </ProductProvider>
  )
}
