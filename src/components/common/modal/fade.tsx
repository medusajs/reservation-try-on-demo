import React, { useEffect, useState } from "react"

import clsx from "clsx"

type FadeProps = {
  isVisible: boolean
  isFullScreen?: boolean
  start?: string
  transitionClass?: string
  end?: string
  classname?: string
  children?: React.ReactNode
}

export const Fade: React.FC<FadeProps> = ({
  isVisible,
  start,
  end,
  classname,
  children,
  isFullScreen = false,
}) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show && !isVisible) {
      setTimeout(() => setShow(false), 100)
    } else {
      setShow(isVisible)
    }
  })

  const classes = {
    [start || "scale-[0.98] opacity-0"]: !isVisible,
    [end || "scale-100 opacity-100"]: isVisible,
    "fixed inset-0": show && isFullScreen,
  }

  return (
    <div
      className={clsx("z-50 transition-all duration-100", classes, classname)}
    >
      {show ? children : null}
    </div>
  )
}

type ModalProps = {
  className?: string
  children?: React.ReactNode
}
export const FocusModal: React.FC<ModalProps> = ({ className, children }) => (
  <div
    className={clsx(
      "dark:border-base-dark border-b-base-light rounded-lg shadow-explainer fixed inset-2 z-50 flex flex-col items-center dark:bg-base-dark bg-base-light",
      className
    )}
  >
    {children}
  </div>
)

export const FocusModalHeader: React.FC<ModalProps> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "dark:border-base-dark border-b-base-light flex w-full border-b py-4",
      className
    )}
  >
    {children}
  </div>
)
