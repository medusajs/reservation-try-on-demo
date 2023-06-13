import * as Portal from "@radix-ui/react-portal"

import { animated, useSpring } from "@react-spring/web"

import React from "react"
import clsx from "clsx"

const MODAL_WIDTH = 560

type SideModalProps = {
  close: (e: { stopPropagation: () => void }) => void
  isVisible: boolean
  children: React.ReactNode
}

/**
 * Side modal displayed as right drawer on open.
 */
const SideModal: React.FC<SideModalProps> = ({
  close,
  isVisible,
  children,
}) => {
  const [showing, setShowing] = React.useState(isVisible)

  React.useEffect(() => {
    if (isVisible) {
      setShowing(true)
    } else {
      setTimeout(() => setShowing(false), 150)
    }
  }, [isVisible])

  return (
    <Portal.Root>
      {showing && (
        <>
          <div
            onClick={close}
            className={clsx(
              "fixed inset-0 bg-black z-50 bg-opacity-30 animate-all duration-200",
              {
                "animate-enterFade": isVisible,
                "animate-leaveFade": !isVisible,
              }
            )}
          />
          <div
            className={clsx(
              "max-w-[560px] w-full h-full fixed p-2 z-50 right-0 top-0 bottom-0 ",
              {
                "animate-enterSlide": isVisible,
              },
              {
                "animate-leaveSlide": !isVisible,
              }
            )}
          >
            <div className="border  w-full h-full dark:border-base-dark border-base-light dark:bg-base-dark bg-base-light rounded-lg">
              {children}
            </div>
          </div>
        </>
      )}
    </Portal.Root>
  )
}

export default SideModal
