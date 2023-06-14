import { CodeSnippet } from "../../code-snippet"
import Switch from "../../switch/switch"
import clsx from "clsx"
import { useState } from "react"

export const ComponentDataBox = ({
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
      <div className="w-full text-xs items-center font-medium gap-x-6 flex pl-8 pb-2 text-base-light dark:text-base-dark">
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
        <div
          className={clsx("w-full h-full flex items-center justify-center", {
            hidden: state !== "data",
          })}
        >
          <CodeSnippet
            code={data}
            language="typescript"
            codeClassNames="sm:h-[390px] h-[300px]"
          />
        </div>
        <div
          className={clsx("w-full h-full flex items-center justify-center", {
            hidden: state !== "component",
          })}
        >
          {Component}
        </div>
      </div>
    </div>
  )
}
