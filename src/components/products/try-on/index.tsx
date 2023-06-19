import {
  AdminPostReservationsReq,
  Image as MedusaImage,
  ProductOption,
} from "@medusajs/medusa"
import {
  ProductProvider,
  useProductActions,
} from "@/lib/context/product-context"
import React, { useState } from "react"

import { Button } from "@/components/common/button"
import Image from "next/image"
import NativeSelect from "@/components/common/native-select"
import PlaceholderImage from "@/components/common/icons/placeholder-image"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import SideModal from "@/components/common/side-modal"
import { Spinner } from "@/components/common/spinner"
import { StockLocationDTO } from "@medusajs/types"
import { client } from "@/lib/data/medusa"
import clsx from "clsx"
import useNotification from "./notification"
import { useQuery } from "@tanstack/react-query"

const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
  self.indexOf(value) === index

type TryOnProps = {
  handle: string
  price?: string
}

const fetchProduct = async (handle: string) => {
  const { products } = await client.products.list({
    handle,
    expand: `variants,variants.options,variants.prices,variants.inventory_items,options,options.values`,
  })

  return products[0]
}

const fetchLocations = async (
  inventoryItemId: string
): Promise<{ try_on_locations: LocationWtihAvailability[] }> => {
  const response = await fetch(`/api/list-locations?invItem=${inventoryItemId}`)
  return await response.json()
}

const createReservation = async (
  data: Omit<AdminPostReservationsReq, "quantity">
) => {
  const response = await fetch(`/api/create-reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

export const TryOn: React.FC<TryOnProps> = ({ handle, price }) => {
  const { data } = useQuery(
    [`get_product`, handle],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: true,
    }
  )

  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {data && (
        <ProductProvider product={data}>
          <TryOnButton setIsOpen={() => setIsOpen(true)} />
          <TryOnDrawer
            product={data}
            price={price}
            close={() => setIsOpen(false)}
            isVisible={isOpen}
          />
        </ProductProvider>
      )}
    </>
  )
}

const TryOnButton = ({ setIsOpen }: { setIsOpen: () => void }) => {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        setIsOpen()
      }}
    >
      Try On
    </Button>
  )
}

export const TryOnDrawer = ({
  close,
  isVisible,
  product,
  price,
}: {
  close: () => void
  isVisible: boolean
  product: PricedProduct
  price?: string
}) => {
  const { updateOptions, options, variant } = useProductActions()
  const [loadingLocations, setLoadingLocations] = useState(false)

  const inventoryItemId = variant?.inventory_items?.[0]?.inventory_item_id

  const [selectedLocation, setSelectedLocation] = React.useState<string>("")
  const [email, setEmail] = React.useState<string | undefined>()
  const [phone, setPhone] = React.useState<string | undefined>()

  const [tryOnLocation, setTryOnLocation] = React.useState<
    LocationWtihAvailability[]
  >([])

  React.useEffect(() => {
    const setLocationData = async () => {
      if (!inventoryItemId) {
        setTryOnLocation([])
        return
      }

      setLoadingLocations(true)
      const { try_on_locations } = await fetchLocations(inventoryItemId!)

      setTryOnLocation(try_on_locations)
      setLoadingLocations(false)
    }

    setLocationData()
  }, [inventoryItemId])

  React.useEffect(() => {
    if (product.variants.length === 1) {
      updateOptions(
        product.variants[0].options?.reduce((acc, curr) => {
          return { ...acc, [curr.option_id]: curr.value }
        }, {}) || {}
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const notification = useNotification()
  const submit = (e: {
    stopPropagation: () => void
    preventDefault: () => void
  }) => {
    e.stopPropagation()
    e.preventDefault()

    if (!inventoryItemId) {
      notification(
        "error",
        "You have to select a size",
        "Please select a size to book a try-on"
      )
      return
    }
    if (!selectedLocation) {
      notification(
        "error",
        "You have to select a location",
        "Please select a location to book a try-on"
      )
      return
    }
    const metadata = Object.entries({
      email,
      phone,
    }).reduce((acc, [key, value]) => {
      if (value) {
        return { ...acc, [key]: value }
      }
      return acc
    }, {})

    const data = {
      location_id: selectedLocation,
      inventory_item_id: inventoryItemId!,
      metadata,
    }

    createReservation(data).then((res) => {
      notification(
        "success",
        "You have booked a Try-On!",
        "Access the Reservation overview and have a look at your Try-On details."
      )
      reset()
      close()
    })
  }

  const reset = () => {
    setSelectedLocation("")
    setEmail(undefined)
    setPhone(undefined)
  }

  const cl = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    reset()
    close()
  }

  return (
    <SideModal close={cl} isVisible={isVisible}>
      <form className="h-full w-full">
        <div className="flex h-full flex-col">
          <div className="border-base-light dark:border-base-dark flex items-center justify-between border-b px-8 py-6">
            <h1 className="font-medium text-xl">Book Try-On</h1>
            <button
              className="p-1 hover:bg-grey-10 rounded-lg border border-grey-20"
              type="button"
              onClick={(e: any) => {
                cl(e)
              }}
            >
              <CrossIcon />
            </button>
          </div>
          <div className="text-sm overflow-y-scroll">
            <div className="flex flex-col grow overflow-y-scroll">
              <div className="px-8 py-6 flex flex-col gap-y-4">
                <h1 className="text-base font-medium">Product</h1>
                <div className="border dark:border-base-dark border-base-light rounded-lg w-full flex h-14 p-2 items-center justify-between">
                  <div className="w-[40px] h-[40px] rounded-lg border dark:border-base-dark border-base-light p-1 object-cover flex items-center justify-center">
                    <Thumbnail
                      className="rounded"
                      thumbnail={product?.thumbnail}
                    />
                  </div>
                  <p className="truncate ml-2 grow">{product.title}</p>
                  <p className="ml-2">{price ?? "-"}</p>
                </div>
                <div>
                  {product.variants.length > 1 && (
                    <div className="flex flex-col gap-y-6">
                      {(product.options || []).map((option) => {
                        return (
                          <div key={option.id}>
                            <OptionSelect
                              option={option}
                              current={options[option.id]}
                              updateOption={updateOptions}
                              title={option.title}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 py-6 border-t border-b dark:border-base-dark border-base-light flex flex-col gap-y-4">
                <h1 className="text-base font-medium">Location</h1>
                <div className="max-h-[300px] overflow-auto flex flex-col gap-y-2">
                  {loadingLocations ? (
                    <div className="w-full flex justify-center ">
                      <Spinner size="medium" />
                    </div>
                  ) : (
                    <LocationButtons
                      tryOnLocation={tryOnLocation}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                    />
                  )}
                </div>
              </div>
              <div className="px-8 py-6 flex flex-col gap-y-4">
                <h1 className="text-base font-medium">Get notified</h1>
                <div>
                  <h2 className="text-sm font-medium mb-2">Email</h2>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    type="email"
                    className="bg-field-light dark:bg-field-dark py-2.5 px-3 rounded-lg w-full border dark:border-base-dark border-base-light"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-medium mb-2">Phone</h2>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone..."
                    className="bg-field-light dark:bg-field-dark py-2.5 px-3 rounded-lg w-full border dark:border-base-dark border-base-light"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="dark:border-base-dark justify-self-end flex-wrap gap-y-2 border-base-light border-t px-8 pt-4 pb-6 text-sm flex items-center justify-end gap-x-2">
            <button
              className="px-3 py-1.5 rounded-lg border dark:border-base-dark border-base-light hover:bg-gray-50"
              onClick={cl}
            >
              Cancel
            </button>
            <Button variant="inverted" onClick={submit} size="small">
              Book try-on
            </Button>
          </div>
        </div>
      </form>
    </SideModal>
  )
}

const LocationButtons = ({
  tryOnLocation,
  selectedLocation,
  setSelectedLocation,
}: {
  tryOnLocation: LocationWtihAvailability[]
  selectedLocation: string
  setSelectedLocation: (arg: string) => void
}) => {
  if (!tryOnLocation.length && !selectedLocation) {
    return (
      <p className="text-subtle-light dark:text-subtle-dark">
        Select a size to see available locations
      </p>
    )
  }

  if (!tryOnLocation?.length && !!selectedLocation) {
    return <p>Not available at any locations for try on...</p>
  }

  return (
    <>
      {tryOnLocation.map((location, i) => {
        return (
          <div key={i}>
            <LocationButton
              location={location}
              onClick={() => setSelectedLocation(location.id)}
              selected={selectedLocation === location.id}
            />
          </div>
        )
      })}
    </>
  )
}

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  className?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  className,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div className="relative -square w-[32px]">
      <ImageOrPlaceholder className={className} image={initialImage} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  className,
}: Pick<ThumbnailProps, "className"> & { image?: string }) => {
  return image ? (
    <Image
      src={`${image}`}
      alt="Thumbnail"
      width={32}
      height={32}
      className={clsx("rounded-lg w-[32px] h-[32px] object-cover", className)}
      draggable={false}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
      <PlaceholderImage size={16} />
    </div>
  )
}

export type LocationWtihAvailability = { available: number } & StockLocationDTO

export const LocationButton = ({
  location,
  onClick,
  selected,
}: {
  location: LocationWtihAvailability
  onClick: () => void
  selected: boolean
}) => {
  const getBadgeVariant = (
    available: number
  ): { variant: "warning" | "danger"; label: string } | null => {
    if (available > 10) {
      return null
    }
    if (available > 0) {
      return { variant: "warning", label: "Only a few left" }
    }
    return { variant: "danger", label: "Out of stock" }
  }

  const badge = getBadgeVariant(location.available as number)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        if (badge?.variant === "danger") {
          return
        }
        onClick()
      }}
      className={clsx(
        "w-full border  flex rounded-lg items-center justify-between p-2",
        {
          "border-blue-600": selected,
          "dark:border-base-dark border-base-light": !selected,
        }
      )}
    >
      <div className="flex dark:border-base-dark border-base-light items-center grow">
        <div className="border rounded-lg p-1">
          <div className="rounded bg-gray-100 p-1.5">
            <BuildingsIcon />
          </div>
        </div>
        <div className="flex flex-wrap grow justify-between">
          <p className="ml-4">{location.name}</p>
          {badge && (
            <Badge variant={badge.variant} className="ml-4">
              {badge.label}
            </Badge>
          )}
        </div>
      </div>
      <p
        className={clsx("mx-2 w-[20px]", {
          "text-blue-500": selected,
        })}
      >
        {selected && <CheckedCircleIcon />}
      </p>
    </button>
  )
}

const Badge: React.FC<
  {
    variant: "danger" | "warning"
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, variant, onClick, className, ...props }) => {
  const variantClassname = clsx({
    ["bg-red-200 border border-red-300 bg-opacity-50 text-red-600"]:
      variant === "danger",
    ["bg-yellow-300 border border-yellow-400 bg-opacity-60 text-yellow-700"]:
      variant === "warning",
  })

  return (
    <div
      className={clsx(
        "py-0.5 flex px-2 rounded-full text-sm font-medium",
        variantClassname,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

const OptionSelect: React.FC<{
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}> = ({ option, current, updateOption, title }) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-medium">{title}</span>
      <NativeSelect
        className="rounded-lg bg-gray-100"
        placeholder="Choose size to check try-on availability"
        value={current}
        onChange={(v) => {
          updateOption({ [option.id]: v.target.value })
        }}
      >
        {filteredOptions.map((v, i) => {
          return (
            <option key={`option-${title}-${i}`} value={v}>
              {v}
            </option>
          )
        })}
      </NativeSelect>
    </div>
  )
}

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

const CrossIcon: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
    >
      <path
        d="M15 5L5 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L15 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const BuildingsIcon: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      {...attributes}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0143 16.5423V8.79977C17.0143 8.59442 16.9328 8.39749 16.7876 8.25229C16.6424 8.10709 16.4454 8.02551 16.2401 8.02551H13.1431"
        stroke="#687076"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.07715 16.5422V4.15417C3.07715 3.94882 3.15872 3.75189 3.30392 3.60669C3.44912 3.46149 3.64606 3.37991 3.8514 3.37991H12.3682C12.5735 3.37991 12.7705 3.46149 12.9157 3.60669C13.0609 3.75189 13.1424 3.94882 13.1424 4.15417V16.5422"
        stroke="#687076"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.98047 6.65213H10.2389"
        stroke="#687076"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.98047 9.96103H10.2389"
        stroke="#687076"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.98087 16.5423H10.2393V13.2089H5.98087V16.5423Z"
        stroke="#687076"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.7888 16.5423H2.30371"
        stroke="#687076"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export const CheckedCircleIcon: React.FC<IconProps> = ({
  size = "20",
  color = "currentColor",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      height={size}
      {...attributes}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.857 8.191C13.9149 8.11129 13.9566 8.02095 13.9796 7.92514C14.0026 7.82933 14.0065 7.72994 13.991 7.63262C13.9756 7.5353 13.9412 7.44198 13.8897 7.35797C13.8382 7.27396 13.7707 7.20091 13.691 7.143C13.6113 7.08509 13.5209 7.04344 13.4251 7.02044C13.3293 6.99744 13.2299 6.99354 13.1326 7.00895C13.0353 7.02437 12.942 7.0588 12.858 7.11028C12.774 7.16176 12.7009 7.22929 12.643 7.309L9.16 12.099L7.28 10.219C7.21078 10.1474 7.128 10.0903 7.03647 10.051C6.94495 10.0118 6.84653 9.99114 6.74694 9.99032C6.64736 9.9895 6.54861 10.0085 6.45646 10.0463C6.3643 10.084 6.28059 10.1398 6.2102 10.2102C6.13982 10.2807 6.08417 10.3644 6.0465 10.4566C6.00883 10.5488 5.9899 10.6476 5.99081 10.7472C5.99173 10.8467 6.01246 10.9451 6.05181 11.0366C6.09116 11.1281 6.14834 11.2108 6.22 11.28L8.72 13.78C8.79663 13.8567 8.88896 13.9158 8.99065 13.9534C9.09233 13.9909 9.20094 14.006 9.30901 13.9975C9.41708 13.9891 9.52203 13.9573 9.61663 13.9044C9.71123 13.8515 9.79324 13.7787 9.857 13.691L13.857 8.191Z"
        fill={color}
      />
    </svg>
  )
}

export default TryOn
