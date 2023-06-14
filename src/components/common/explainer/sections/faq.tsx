import { Paragraph } from "../../paragraph"
import { Pill } from "../../pill"

export const FAQ = () => {
  return (
    <div className="flex flex-col gap-y-1.5 mt-20">
      <div className="mb-3">
        <Pill>FAQ</Pill>
      </div>
      <h4 className="text-headers-h4 pt-3 text-base-light dark:text-base-dark">
        What are Medusa Modules?
      </h4>
      <p className="text-subtle-light dark:text-subtle-dark text-body-regular">
        Modules are packages with self-contained commerce logic, promoting
        separation of concerns, maintainability, and reusability. Modules
        increase Medusa&apos;s extensibility, allowing for customization of core
        commerce logic and composition with other tools. This flexibility allows
        for greater choice in the tech stack used in conjunction with Medusa.
      </p>
      <h4 className="text-headers-h4 pt-3 text-base-light dark:text-base-dark">
        Why run it from a Next.js function?
      </h4>
      <div>
        <Paragraph>
          Running Medusa&apos;s Product Module in a serverless function provides
          several benefits over hosting a conventional backend:
        </Paragraph>
        <ul className="list-disc ml-8 text-subtle-light dark:text-subtle-dark text-body-regular mt-4">
          <li>
            It offers fast response times, making it suitable for use cases like
            realtime personalization.
          </li>
          <li>
            The Next.js function scales automatically to meet demand, meaning
            there is no need to worry about provisioning and managing servers.
          </li>
          <li>
            The Next.js function is only invoked when needed, reducing the
            overall cost of running the module.
          </li>
        </ul>
        <Paragraph>
          Our future work will focus on publishing all core Medusa domains as
          modules and making them compatible with edge runtimes.
        </Paragraph>
      </div>
    </div>
  )
}
