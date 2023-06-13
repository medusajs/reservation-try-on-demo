import CardPrice from "./CardPrice"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Tags } from "@/components"

type Props = {
  product: PricedProduct
}

const Info = ({ product }: Props) => {
  return (
    <div className="p-6 w-full h-[106px] flex flex-col gap-y-3">
      <div className="flex items-start justify-between font-medium text-labels-large">
        <div className="flex flex-col gap-y-3">
          <p>{product.title}</p>
          <Tags tags={product.tags} categories={product.categories} />
        </div>
        <CardPrice product={product} />
      </div>
    </div>
  )
}

export default Info
