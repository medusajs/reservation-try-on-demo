import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

// import { useStore } from "./store-context"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { ProductVariant } from "@medusajs/medusa"
import isEqual from "lodash/isEqual"

export type Variant = Omit<ProductVariant, "beforeInsert">

interface ProductContext {
  variant?: Variant
  options: Record<string, string>
  updateOptions: (options: Record<string, string>) => void
}

const ProductActionContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
  product: PricedProduct
}

export const ProductProvider = ({
  product,
  children,
}: ProductProviderProps) => {
  const [options, setOptions] = useState<Record<string, string>>({})

  const variants = product.variants as unknown as Variant[]

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  return (
    <ProductActionContext.Provider
      value={{
        options,
        variant,
        updateOptions,
      }}
    >
      {children}
    </ProductActionContext.Provider>
  )
}

export const useProductActions = () => {
  const context = useContext(ProductActionContext)
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return context
}
