import { Fade, FocusModal, FocusModalHeader } from "./fade"
import {
  LocationButton,
  LocationWtihAvailability,
  TryOnDrawer,
} from "@/components/products/try-on"
import React, { useEffect, useState } from "react"

import Card from "@/components/products/card/Card"
import { CodeSnippet } from "../code-snippet"
import { DataSnippet } from "../code-snippet/CodeSnippet"
import { Divider } from "../divider"
import { Nextjs } from "@/components/icons/nextjs"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { ProductProvider } from "@/lib/context/product-context"
import { Spinner } from "../spinner"
import Switch from "../switch/switch"
import { client } from "@/lib/data/medusa"
import clsx from "clsx"
import useNotification from "@/components/products/try-on/notification"

export const ExplainerBody = () => {
  return (
    <div className="w-full h-full px-1.5 pb-20">
      <ExplainerHero />
      <div className="flex flex-col w-full items-center">
        <div className="w-10/12 lg:w-2/3 xl:w-1/2">
          <ExplainerContent />
          <Divider />
          <FooterBlock />
        </div>
      </div>
    </div>
  )
}

const ExplainerHero = () => (
  <div className="relative left-1/2 -translate-x-1/2 h-[480px] max-w-[1500px] overflow-hidden dark:bg-base-dark bg-base-light rounded-2xl flex flex-col items-center justify-center text-headers-h2.5 font-medium">
    <div className="absolute inset-0 bg-[url('/hero.svg')] bg-cover dark:invert-0 invert" />
    <h1 className="text-base-light dark:text-base-dark">Book Try-On Demo</h1>
    <h1 className="text-subtle-light dark:text-subtle-dark">
      Powered by Medusa.
    </h1>

    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-[#1C1C1C]" />
  </div>
)

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
      <ExplainerRubric />
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

const ExplainerRubric = () => {
  return (
    <div className="flex flex-col w-full items-start sm:px-5">
      <a
        href="https://docs.medusajs.com/?utm_source=inventory-module-demo&utm_medium=recap&utm_campaign=about-page&utm_content=pill"
        className="bg-tag-neutral-light dark:bg-tag-neutral-dark py-1.5 text-labels-small dark:text-base-dark text-base-light font-medium px-4 rounded-full shadow-card-rest"
      >
        <span className="mr-3 pr-3 border-r dark:border-r-neutral-a-dark border-r-neutral-button-light">
          Building blocks
        </span>
        <span className="dark:text-subtle-dark text-subtle-light">
          Read more
        </span>
      </a>

      <div className="flex flex-col gap-y-1.5">
        <h2 className="text-headers-h4 font-medium mt-7">
          Book Try-On Demo in
          <p className="inline-block align-text-top px-2">
            <Nextjs color={"currentcolor"} />
          </p>
          Next.JS Functions
        </h2>
        <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
          In this walkthrough we will create an omnichannel experience that
          allows a customer to book an item online to try-on in a physical
          store.
        </p>
        <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
          To ensure that the item is ready in-store for customers to try on, we
          will create a Reservation for the item upon booking.
        </p>
        <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
          We will use Medusa&apos;s Inventory and Stock Location modules
          directly in Next.js functions to achieve this experience.
        </p>
        <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
          You can read more about Medusa&apos;s omnichannel capabilities{" "}
          <a
            className="font-semibold"
            href="https://medusajs.com/blog/announcing-multi-warehouse/?utm_source=inventory-module-demo&utm_medium=recap&utm_campaign=about-page"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  )
}

const FooterBlock = () => {
  return (
    <div className="flex flex-col gap-y-1.5 mt-20">
      <h4 className="text-headers-h4 pt-3 text-base-light dark:text-base-dark">
        What are Medusa Modules?
      </h4>
      <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
        Modules are packages with self-contained commerce logic, promoting
        separation of concerns, maintainability, and reusability. Modules
        increase Medusa&apos;s extensibility, allowing for customization of core
        commerce logic and composition with other tools. This flexibility allows
        for greater choice in the tech stack used in conjunction with Medusa.
      </p>
      <h4 className="text-headers-h4 pt-3 text-base-light dark:text-base-dark">
        Why run it from a Next.js function?
      </h4>
      <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
        Running Medusa&apos;s Product Module in a serverless function provides
        several benefits over hosting a conventional backend:
      </p>
      <ul className="list-disc ml-8 text-subtle-light dark:text-subtle-dark text-body-regular">
        <li>
          It offers fast response times, making it suitable for use cases like
          realtime personalization.
        </li>
        <li>
          The Next.js function scales automatically to meet demand, meaning
          there is no need to worry about provisioning and managing servers.
        </li>
        <li>
          The Next.js function is only invoked when needed, reducing the overall
          cost of running the module.
        </li>
      </ul>
      <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
        Our future work will focus on publishing all core Medusa domains as
        modules and making them compatible with edge runtimes.
      </p>
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
      <div className="w-full flex pt-4 pl-2 sm:overflow-x-scroll pr-5">
        <div className="min-h-full w-[1px] mr-6 bg-border-light dark:bg-border-dark flex flex-col justify-end">
          <div className="h-[200px] w-full bg-gradient-to-t from-white dark:from-[#1C1C1C]" />
        </div>
        <div className="flex flex-col w-[calc(100%-25px)] ">
          <ProductDataBlock product={product} />
          <Divider />
          <ListingInventoryLevelsBlock />
          <Divider />
          <ListingLocationsBlock product={product} />
          <Divider />
          <WhatIsAReservationBlock />
          <Divider />
          <DemoDataBlock product={product} />
          <Divider />
          <MerchantBlock />
        </div>
      </div>
    </ProductProvider>
  )
}

const ProductDataBlock = ({ product }: { product: PricedProduct }) => {
  const notification = useNotification()

  const handleClick = () => {
    notification(
      "warning",
      "Hold on!",
      "Let's first explain how inventory levels and stock locations play a role"
    )
  }
  return (
    <ExplainerBlock
      subtitle="Products"
      title="Start by getting product data"
      description={
        <>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            The first step in the try-on booking flow is to get the products
            that can be booked for try on. We will use Medusa&apos;s js client
            to retrieve a list of these products below.
          </p>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            You can view the data output below or view an example component of
            how the product could be displayed in the frontend.
          </p>
        </>
      }
      body={
        <div className="w-full flex flex-col gap-y-4">
          <CodeSnippet // TODO: link to github
            language="typescript"
            label={
              <a href="https://github.com/medusajs/medusa">
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

const MerchantBlock = () => {
  return (
    <ExplainerBlock
      subtitle="Merchant"
      title="How the merchant manages reservations"
      description={
        "Once the reservation is created you can use powerful filters in the Medusa Admin to see all reservations in a location and drill down into the results. This allows store staff to know when a reservation was created and who is coming for try-ons."
      }
      body={
        <div className="rounded-lg w-full p-2 flex flex-col overflow-y-auto overflow-x-hidden">
          <video className="w-full" controls>
            <source
              src="https://medusa-test.fra1.digitaloceanspaces.com/try-on-demo/reservations-filters.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      }
    />
  )
}

const DemoDataBlock = ({ product }: { product: PricedProduct }) => {
  return (
    <ExplainerBlock
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

const ListingInventoryLevelsBlock = () => {
  return (
    <ExplainerBlock
      subtitle="Locations"
      title="Listing inventory levels"
      description={
        <>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            When the user clicks the product they want to try on they should
            view a list of stores where they can book the try on.
          </p>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            To get this list we will use Medusa&apos;s Stock Location and
            Inventory modules.
          </p>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            The Product in our Medusa store is kept at several locations and we
            can use the approach in the code snippet below to list the stock
            level for each of them.
          </p>
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
                    <a href="https://github.com/medusajs/medusa">
                      src/app/api/list-locations/route.ts
                    </a>
                  }
                  codeClassNames="h-[337px]"
                  language="typescript"
                  code={`import { initialize as initializeInventory } from "@medusajs/inventory"
import { initialize as initializeStockLocation } from "@medusajs/stock-location"

export async function GET(request: Request) {

  const inventoryService = await initializeInventory({})

  const stockLocationService = await initializeStockLocation({})

  const [levels] = await inventoryService.listInventoryLevels(
    { inventory_item_id: variantInventoryItemId }
  )
  
  ...
`}
                />
              </div>
            }
          />
        </div>
      }
    />
  )
}

const whatIsAReservationDescription =
  "When the user has filled out relevant information about their booking and submits the modal form, a second vercel function is invoked to create the reservation in the backend. This function uses only the Inventory Module (initialization is omitted here). Based on the information submitted by the customer the reservation is created with a pre-defined quantity and description. User information is passed in the metadata."
const WhatIsAReservationBlock = () => {
  return (
    <ExplainerBlock
      subtitle="Reservations"
      title="Creating a reservation item"
      description={whatIsAReservationDescription}
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

const fetchLocations = async (
  inventoryItemId: string
): Promise<{ try_on_locations: LocationWtihAvailability[] }> => {
  const response = await fetch(`/api/list-locations?invItem=${inventoryItemId}`)
  return await response.json()
}

const ListingLocationsBlock = ({ product }: { product: PricedProduct }) => {
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
    <ExplainerBlock
      subtitle="Locations"
      title="Joining locations"
      description={
        <>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            In the Inventory Level data we get the <code>location_id</code>{" "}
            where the inventory is stored, but we want to get data like the name
            of the location and whether the location allows try ons in order to
            display something nice to the customer. For this we use the stock
            location module.
          </p>
          <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
            Putting it all together we can generate a response in our Nextjs
            function with all the locations where the product can be tried.
            Below you can see the data output and a component representation.
          </p>
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
            code={`  ...
    
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
      "Not yet!",
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
            className="hover:shadow-md hover:bg-subtle-light dark:hover:bg-subtle-dark rounded-lg"
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

const ComponentDataBox = ({
  Component,
  data,
  alternativeComponentTitle = undefined,
}: {
  Component: React.ReactNode
  data: string
  alternativeComponentTitle?: string
}) => {
  const [state, setState] = useState<"component" | "data">("component")

  return (
    <div className="rounded-lg w-full md:h-[460px] flex flex-col overflow-y-auto my-5">
      <div className="w-full text-xs items-center font-semibold gap-x-6 flex pl-8 pb-2 text-base-light dark:text-base-dark">
        <span
          onClick={() => {
            setState("data")
          }}
          className={clsx(
            "cursor-pointer transition-duration-100 transition-all",
            {
              "text-muted-light dark:text-muted-dark": state !== "data",
            }
          )}
        >
          Data
        </span>
        <Switch
          checked={state === "component"}
          type="button"
          className="cursor-pointer"
          onClick={() => {
            setState((prev) => (prev === "component" ? "data" : "component"))
          }}
        />
        <span
          onClick={() => {
            setState("component")
          }}
          className={clsx(
            "cursor-pointer transition-duration-100 transition-all",
            {
              "text-muted-light dark:text-muted-dark": state !== "component",
            }
          )}
        >
          {alternativeComponentTitle ?? "Component"}
        </span>
      </div>
      <div className="max-w-full flex mt-2 flex-col h-full overflow-x-hidden">
        {state === "data" && (
          <div
            className={clsx("w-full h-full flex items-center justify-center")}
          >
            <CodeSnippet
              code={data}
              language="typescript"
              codeClassNames="md:h-[390px] h-[300px]"
            />
          </div>
        )}
        {state === "component" && (
          <div
            className={clsx("w-full h-full flex items-center justify-center")}
          >
            {Component}
          </div>
        )}
      </div>
    </div>
  )
}

type ExplainerBlockProps = {
  body?: React.ReactNode
  subtitle: string
  title: string
  description: string | React.ReactNode
}
const ExplainerBlock: React.FC<ExplainerBlockProps> = ({
  title,
  subtitle,
  description,
  body,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <div className="bg-base-light border-2 border-tag-purple-light dark:border-tag-purple-dark dark:bg-base-dark rounded-full w-[12px] h-[12px] -ml-6 -translate-x-1/2" />
        <h2 className="text-tag-purple-light ml-3 dark:text-tag-purple-dark text-labels-small font-medium">
          {subtitle}
        </h2>
      </div>
      <h2 className="text-labels-regular font-medium mt-2">{title}</h2>
      {typeof description !== "string" ? (
        description
      ) : (
        <p className="text-body-regular text-subtle-light dark:text-subtle-dark mt-1">
          {description}
        </p>
      )}
      {body && <div className="mt-4">{body}</div>}
    </div>
  )
}
