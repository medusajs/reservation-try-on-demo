import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import ChevronDown from "../icons/chevron-down"
import clsx from "clsx"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      placeholder = "Select...",
      errors,
      touched,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clsx(
            "relative flex dark:bg-base-dark bg-base-light items-center text-base-regular border border-base-light dark:border-base-dark",
            className,
            {
              "text-gray-500": isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            {...props}
            className="appearance-none truncate max-w-[calc(100%-20px)] flex-1 bg-transparent border-none px-4 py-2.5 transition-colors duration-150 focus:border-gray-700 outline-none"
          >
            <option value="">{placeholder}</option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
            <ChevronDown />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
