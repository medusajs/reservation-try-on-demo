import {
  LocationButton,
  LocationWtihAvailability,
} from "@/components/products/try-on"

import { CodeSnippet } from "../../code-snippet"
import { ComponentDataBox } from "../components/component-data-box"
import { ExplainerSection } from "../components/explainer-section"
import ImageRepository from "@medusajs/medusa/dist/repositories/image"
import { Paragraph } from "../../paragraph"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React from "react"
import useNotification from "@/components/products/try-on/notification"

const fetchLocations = async (
  inventoryItemId: string
): Promise<{ try_on_locations: LocationWtihAvailability[] }> => {
  const response = await fetch(`/api/list-locations?invItem=${inventoryItemId}`)
  return await response.json()
}

export const ListingLocationsSection = ({
  product,
}: {
  product: PricedProduct
}) => {
  const [tryOnLocations, setTryOnLocations] = React.useState<{
    try_on_locations?: LocationWtihAvailability[]
  }>({})

  const inventoryItemId =
    product.variants[0]?.inventory_items?.[0]?.inventory_item_id

  React.useEffect(() => {
    const setLocationData = async () => {
      const data = await fetchLocations(inventoryItemId!)

      setTryOnLocations(data)
    }

    setLocationData()
  }, [inventoryItemId])

  return (
    <ExplainerSection
      subtitle="Locations"
      title="Joining locations"
      description={
        <>
          <Paragraph>
            In the Inventory Level data we get the <code>location_id</code>{" "}
            where the inventory is stored, but we want to get data like the name
            of the location and whether the location allows try ons in order to
            display something nice to the customer. For this we use the stock
            location module.
          </Paragraph>
          <Paragraph>
            Putting it all together we can generate a response in our Nextjs
            function with all the locations where the product can be tried.
            Below you can see the data output and a component representation.
          </Paragraph>
        </>
      }
      body={
        <div className="w-full flex flex-col gap-y-4">
          <CodeSnippet
            label={
              <a href="https://github.com/medusajs/medusa">
                src/app/api/list-locations/route.ts
              </a>
            }
            language="typescript"
            code={`export async function GET(request: Request) {

  // ...
            
  const stockLocations = await stockLocationService.list({
    id: levels.map((l) => l.location_id),
  })

  return {
    try_on_locations: stockLocations.filter((sl) => !!sl.metadata?.try_on),
  }
}`}
          />
          <ComponentDataBox
            data={JSON.stringify(tryOnLocations, null, 2)}
            Component={
              <div className="p-3 rounded-lg ">
                <LocationsButtons
                  tryOnLocation={tryOnLocations?.try_on_locations}
                />
              </div>
            }
          />
        </div>
      }
    />
  )
}

const LocationsButtons = ({
  tryOnLocation,
}: {
  tryOnLocation?: LocationWtihAvailability[]
}) => {
  const notification = useNotification()

  const handleClick = () => {
    notification(
      "warning",
      "Not yet",
      "We just need to talk about reservation items first"
    )
  }

  return !tryOnLocation?.length ? (
    <p>Not available at any locations for try on...</p>
  ) : (
    <div className="flex flex-col gap-y-2">
      {tryOnLocation.map((location, i) => {
        return (
          <div
            key={i}
            className="hover:shadow-md hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-lg w-[500px]"
          >
            <LocationButton
              onClick={handleClick}
              location={location}
              selected={false}
            />
          </div>
        )
      })}
    </div>
  )
}
