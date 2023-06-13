import * as RadixSwitch from "@radix-ui/react-switch"

import React from "react"
import clsx from "clsx"

/**
 * A controlled switch component atom.
 */
const Switch = React.forwardRef<HTMLButtonElement, RadixSwitch.SwitchProps>(
  ({ checked, ...props }, ref) => {
    return (
      <RadixSwitch.Root
        ref={ref}
        {...props}
        checked={checked}
        className={clsx("bg-code h-[18px] w-8 rounded-full")}
      >
        <RadixSwitch.Thumb
          className={clsx(
            " block h-2 w-2 rounded-full bg-white transition-transform",
            {
              "translate-x-[19px]": checked,
              "translate-x-[5px]": !checked,
            }
          )}
        />
      </RadixSwitch.Root>
    )
  }
)

Switch.displayName = "Switch"

export default Switch
