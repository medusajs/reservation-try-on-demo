"use client"

import Info from "./Info"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { ProductProvider } from "@/lib/context/product-context"
import React from "react"
import Thumbnail from "./Thumbnail"
import { TryOnDrawer } from "../try-on"
import { formatPrice } from "@/lib"

type Props = {
  product: PricedProduct
  alternativeClick?: () => void
}
const Card = ({ product, alternativeClick }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const calculatedPrice = product.variants[0]?.calculated_price_incl_tax
  const price = formatPrice(
    calculatedPrice,
    product.variants?.[0]?.prices?.[0]?.currency_code
  )

  return (
    <div
      onClick={() => (alternativeClick ? alternativeClick() : setIsOpen(true))}
      className="shadow-card-hover-light dark:shadow-card-hover-dark cursor-pointer rounded-2xl overflow-hidden w-full group/card bg-base-light dark:bg-base-dark"
    >
      <ProductProvider product={product}>
        <Thumbnail thumbnail={product.thumbnail} alt={product.title} />
        <Info product={product} />
        <TryOnDrawer
          product={product}
          price={price}
          close={() => setIsOpen(false)}
          isVisible={isOpen}
        />
      </ProductProvider>
    </div>
  )
}

export default Card
