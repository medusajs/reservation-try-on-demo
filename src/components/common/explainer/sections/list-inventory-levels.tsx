import { CodeSnippet } from "../../code-snippet"
import { ComponentDataBox } from "../components/component-data-box"
import { ExplainerSection } from "../components/explainer-section"
import { Paragraph } from "../../paragraph"

export const ListingInventoryLevelsSection = () => {
  return (
    <ExplainerSection
      subtitle="Locations"
      title="Listing inventory levels"
      description={
        <>
          <Paragraph>
            When the user clicks the product they want to try on they should
            view a list of stores where they can book the try on.
          </Paragraph>
          <Paragraph>
            To get this list we will use Medusa&apos;s Stock Location and
            Inventory modules.
          </Paragraph>
          <Paragraph>
            The Product in our Medusa store is kept at several locations and we
            can use the approach in the code snippet below to list the stock
            level for each of them.
          </Paragraph>
        </>
      }
      body={
        <div className="w-full flex flex-col gap-y-4">
          <ComponentDataBox
            alternativeComponentTitle="Code"
            data={`{
  levels: [
    { 
        "id": "ilev_01H2CXQVE31D8C1BCDX0YZ8D49",
        "created_at": "2023-06-08T07:15:07.341Z",
        "updated_at": "2023-06-08T07:15:07.341Z",
        "deleted_at": null,
        "inventory_item_id": "iitem_01H2CXQSBJC7509R1M8P6ZMFWT",
        "location_id": "sloc_01H2CVTP371AEK0FDWRDC2QW3R",
        "stocked_quantity": 64,
        "reserved_quantity": 0,
        "incoming_quantity": 0,
        "metadata": null,
        "available_quantity": 64
    },
    {
        "id": "ilev_01H2CXQVEFNHJ9N85717RE6NYF",
        "created_at": "2023-06-08T07:15:07.350Z",
        "updated_at": "2023-06-09T13:24:53.265Z",
        "deleted_at": null,
        "inventory_item_id": "iitem_01H2CXQSBJC7509R1M8P6ZMFWT",
        "location_id": "sloc_01H2CVSF6YPJV201ZZ8CQPJ39F",
        "stocked_quantity": 64,
        "reserved_quantity": 1,
        "incoming_quantity": 0,
        "metadata": null,
        "available_quantity": 63
    },
    {
        "id": "ilev_01H2CXQVEGMPMZEDV0PXSH7Z2S",
        "created_at": "2023-06-08T07:15:07.349Z",
        "updated_at": "2023-06-08T07:15:07.349Z",
        "deleted_at": null,
        "inventory_item_id": "iitem_01H2CXQSBJC7509R1M8P6ZMFWT",
        "location_id": "sloc_01H2CVT28B9JQT251EVXG23AR8",
        "stocked_quantity": 64,
        "reserved_quantity": 0,
        "incoming_quantity": 0,
        "metadata": null,
        "available_quantity": 64
    }
  ]
}`}
            Component={
              <div className="w-full h-full flex items-center justify-center">
                <CodeSnippet
                  label={
                    <a href="https://github.com/medusajs/reservation-try-on-demo/blob/main/src/app/api/list-locations/route.ts">
                      src/app/api/list-locations/route.ts
                    </a>
                  }
                  codeClassNames=""
                  language="typescript"
                  code={`import { initialize as initializeInventory } from "@medusajs/inventory"
import { initialize as initializeStockLocation } from "@medusajs/stock-location"

export async function GET(request: Request) {

  const inventoryService = await initializeInventory({})

  const stockLocationService = await initializeStockLocation({})

  const [levels] = await inventoryService.listInventoryLevels(
    { inventory_item_id: variantInventoryItemId }
  )

  // ...
  
}`}
                />
              </div>
            }
          />
        </div>
      }
    />
  )
}
