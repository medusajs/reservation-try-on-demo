import { Card } from "@/components/products"
import { ExplainerSection } from "../components/explainer-section"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import clsx from "clsx"

export const DemoSection = ({ product }: { product: PricedProduct }) => {
  return (
    <ExplainerSection
      subtitle="Try-on Demo"
      title="Putting it all together"
      description={
        "We cheated a bit and have created a full flow for you to try. Click the card below to experience the booking flow."
      }
      body={
        <div className="w-full flex flex-col gap-y-4">
          <div className="rounded-lg w-full md:h-[460px] p-2 flex flex-col overflow-y-auto overflow-x-hidden my-4">
            <div
              className={clsx("w-full h-full flex items-center justify-center")}
            >
              <div className="w-80 h-80">
                <Card product={product} />
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
