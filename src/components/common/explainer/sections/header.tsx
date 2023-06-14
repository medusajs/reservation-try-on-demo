import { Nextjs } from "@/components/icons/nextjs"
import { Paragraph } from "../../paragraph"
import { Pill } from "../../pill"

export const ExplainerHeader = () => {
  return (
    <div className="flex flex-col w-full items-start sm:px-5">
      <Pill link="https://docs.medusajs.com/?utm_source=inventory-module-demo&utm_medium=recap&utm_campaign=about-page&utm_content=pill">
        <span className="mr-3 pr-3 border-r dark:border-r-neutral-a-dark border-r-neutral-button-light">
          Building blocks
        </span>
        <span className="dark:text-subtle-dark text-subtle-light">
          Read more
        </span>
      </Pill>

      <div className="flex flex-col gap-y-1.5">
        <h2 className="text-headers-h4 font-medium mt-7">
          Book Try-On Demo in
          <p className="inline-block align-text-top px-2">
            <Nextjs color={"currentcolor"} />
          </p>
          Next.JS Functions
        </h2>
        <div>
          <Paragraph>
            In this walkthrough we will create an omnichannel experience that
            allows a customer to book an item online to try-on in a physical
            store.
          </Paragraph>
          <Paragraph>
            To ensure that the item is ready in-store for customers to try on,
            we will create a Reservation for the item upon booking.
          </Paragraph>
          <Paragraph>
            We will use Medusa&apos;s Inventory and Stock Location modules
            directly in Next.js functions to achieve this experience.
          </Paragraph>
          <Paragraph>
            You can read more about Medusa&apos;s omnichannel capabilities{" "}
            <a
              className="font-semibold"
              href="https://medusajs.com/blog/announcing-multi-warehouse/?utm_source=inventory-module-demo&utm_medium=recap&utm_campaign=about-page"
            >
              here
            </a>
            .
          </Paragraph>
        </div>
      </div>
    </div>
  )
}
