import { CodeSnippet } from "../../code-snippet"
import { ComponentDataBox } from "../components/component-data-box"
import { ExplainerSection } from "../components/explainer-section"
import { Paragraph } from "../../paragraph"

export const WhatIsAReservationSection = () => {
  return (
    <ExplainerSection
      subtitle="Reservations"
      title="Creating a reservation item"
      description={
        <>
          <Paragraph>
            So far we have listed products and gathered information about where
            the product is stocked and available for try-on. The next step in
            the experience is to ensure items are available when a customer has
            booked a try-on - we don&apos;t want the customer to arrive at the
            store and find that the item they wanted to try has been sold out.
            To enable this will use Medusa&apos;s Reservations.
          </Paragraph>
          <Paragraph>
            Reservations create a virtual reduction in stock and are, by
            default, used to avoid overselling items when an order is placed and
            pending fulfillment. In our example we are using reservations to
            make sure items are ready to try on when our customer visit the
            store following their try-on booking.
          </Paragraph>
          <Paragraph>
            The code snippet below shows how to create a Reservation through a
            Nextjs function using the Inventory Module.
          </Paragraph>
        </>
      }
      body={
        <div className="w-full flex flex-col gap-y-4">
          <ComponentDataBox
            alternativeComponentTitle="Code"
            data={`{
  "reservation": {
    "id": "resitem_01H23EBVEPFJ5V64T3PDE2X6S5",
    "created_at": "2023-06-04T14:53:15.598Z",
    "updated_at": "2023-06-04T14:53:15.598Z",
    "deleted_at": null,
    "line_item_id": null,
    "inventory_item_id": "iitem_01GZ1BA90VV1V1ESHTN0AF0015",
    "location_id": "sloc_01GZ1BA3R2W99J2XG1BJ85MYBN",
    "quantity": 1,
    "external_id": null,
    "description": null,
    "created_by": null,
    "metadata": {
        "email": "test@medusajs.com"
    }
  } 
}`}
            Component={
              <div className="w-full h-full flex items-center justify-center">
                <CodeSnippet
                  label={
                    <a href="https://github.com/medusajs/medusa">
                      src/app/api/create-reservation/route.ts
                    </a>
                  }
                  codeClassNames="h-[337px]"
                  language="typescript"
                  code={`import { initialize } from "@medusajs/inventory"

export async function POST(request: NextRequest) {
  const { location_id, inventory_item_id, metadata } = await request.json()

  const inventoryService = await initialize({})
                  
  const reservationItem = await inventoryService.createReservationItem({
    location_id,
    inventory_item_id,
    description: "try on",
    quantity: 1,
    metadata,
  })
  
  return NextResponse.json({
    reservationItem,
  })
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
