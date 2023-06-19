import { CheckedCircleIcon } from "."
import ChevronDown from "@/components/common/icons/chevron-down"
import React from "react"
import type { Toast } from "react-hot-toast"
import clsx from "clsx"
import { toast as globalToast } from "react-hot-toast"

const ICON_SIZE = 20

const useNotification = () => {
  return (type: string, title: string, message: string) => {
    globalToast.custom(
      (t) => (
        <Notification toast={t} title={title} message={message} type={type} />
      ),
      {
        position: "bottom-right",
        duration: 3000,
      }
    )
  }
}

export default useNotification

type NotificationProps = {
  toast: Toast
  title: string
  message: string
  type: string
}

const Notification: React.FC<NotificationProps> = ({
  toast,
  title,
  message,
  type,
}) => {
  const onDismiss = () => {
    globalToast.dismiss(toast.id)
  }

  return (
    <ToasterContainer visible={toast.visible} className="w-[380px]">
      <div>{getIcon(type)}</div>
      <div className="ml-4 mr-4 gap-y-2 flex flex-grow flex-col">
        <span className="text-sm text-gray-900 dark:text-base-dark">
          {title}
        </span>
        <span className="text-muted-light dark:text-muted-dark text-sm">
          {message}
        </span>
      </div>
      <div>
        <button className="text-grey-40" onClick={onDismiss}>
          <CrossIcon size={ICON_SIZE} />
        </button>
        <span className="sr-only">Close</span>
      </div>
    </ToasterContainer>
  )
}

function getIcon(type: string) {
  switch (type) {
    case "warning":
      return (
        <span className="text-yellow-600">
          <ChevronDown />
        </span>
      )
    case "error":
      return (
        <span className="text-red-600">
          <CrossIcon />
        </span>
      )
    case "success":
    default:
      return (
        <span className="text-emerald-400">
          <CheckedCircleIcon size={ICON_SIZE} />
        </span>
      )
  }
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

type ToasterContainerProps = {
  visible: boolean
} & React.HTMLAttributes<HTMLDivElement>

const ToasterContainer: React.FC<ToasterContainerProps> = ({
  children,
  visible,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-base-dark p-base rounded-lg px-4 pt-4 pb-6 mb-xsmall flex items-start border border-base-light dark:border-base-dark last:mb-0",
        className,
        {
          "animate-enter": visible,
        },
        {
          "animate-leave": !visible,
        }
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
