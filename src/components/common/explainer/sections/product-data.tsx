import { Card } from "@/components/products"
import { CodeSnippet } from "../../code-snippet"
import { ComponentDataBox } from "../components/component-data-box"
import { ExplainerSection } from "../components/explainer-section"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import useNotification from "@/components/products/try-on/notification"

export const ProductDataSection = ({ product }: { product: PricedProduct }) => {
  const notification = useNotification()

  const handleClick = () => {
    notification(
      "warning",
      "Hold on",
      "Let's first explain how inventory levels and stock locations play a role"
    )
  }
  return (
    <ExplainerSection
      subtitle="Products"
      title="Start by getting product data"
      description={
        <>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark">
            The first step in the try-on booking flow is to get the products
            that can be booked for try on. We will use Medusa&apos;s js client
            to retrieve a list of these products below.
          </p>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-4">
            You can view the data output below or view an example component of
            how the product could be displayed in the frontend.
          </p>
        </>
      }
      body={
        <div className="w-full flex flex-col gap-y-4">
          <CodeSnippet
            language="typescript"
            label={
              <a href="https://github.com/medusajs/reservation-try-on-demo/blob/main/src/components/common/explainer/explainer.tsx#L42">
                src/components/common/modal/explainer.tsx
              </a>
            }
            code={`async function listProducts(): Promise<PricedProduct[]> {
  const { products } = await client.products.list({
    limit: 1,
    expand: expandFields,
  })

  return products
}`}
          />
          <ComponentDataBox
            data={JSON.stringify(product, null, 2)}
            Component={
              <div className="w-80 h-80">
                <div
                  className="hover:shadow-card-rest rounded-2xl"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Card
                    key={product.id}
                    product={product}
                    alternativeClick={handleClick}
                  />
                </div>
              </div>
            }
          />
        </div>
      }
    />
  )
}
