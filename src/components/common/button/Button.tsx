import { PropsWithChildren } from "react"
import clsx from "clsx"

type Props = PropsWithChildren<
  {
    variant?: "primary" | "inverted"
    size?: "small" | "medium"
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>

const Button = ({
  variant = "primary",
  size = "small",
  onClick,
  children,
}: Props) => {
  const bg = {
    primary:
      "bg-gradient-to-b from-white dark:from-[#2E2E32] to-[#F8F9FA] dark:to-[#28282C] text-base-light dark:text-base-dark border-neutral-button-light dark:border-neutral-button-dark",
    inverted:
      "bg-gradient-to-b from-[#26292B] dark:from-white to-[#151718] dark:to-[#F4F2F4] text-base-dark dark:text-base-light",
  }[variant]

  const sizeClass = {
    small: "px-3 py-1.5 text-labels-small",
    medium: "p-2 text-labels-regular py-[9px] ",
  }[size]

  return (
    <button
      onClick={onClick}
      className={clsx(
        bg,
        sizeClass,
        "flex items-center justify-center whitespace-nowrap text-labels-regular font-medium h-fit rounded-[7px] border"
      )}
    >
      {children}
    </button>
  )
}

export default Button
