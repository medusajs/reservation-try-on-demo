import React from "react"
import clsx from "clsx"

type SpinnerProps = {
  size?: "large" | "medium" | "small"
  variant?: "primary" | "secondary"
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "large",
  variant = "secondary",
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        { "h-[35px] w-[35px]": size === "large" },
        { "h-[20px] w-[20px]": size === "medium" },
        { "h-[16px] w-[16px]": size === "small" }
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className={clsx(
            "animate-ring rounded-full h-4/5 w-4/5 border-2 border-transparent",
            { "border-t-black": variant === "primary" },
            { "border-t-violet-600": variant === "secondary" }
          )}
        />
      </div>
    </div>
  )
}

export default Spinner
