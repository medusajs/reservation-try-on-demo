import { ExplainerSection } from "../components/explainer-section"

export const FiltersVideoSection = () => {
  return (
    <ExplainerSection
      subtitle="Merchant"
      title="How the merchant manages reservations"
      description={
        "Once the reservation is created you can use powerful filters in the Medusa Admin to see all reservations in a location and drill down into the results. This allows store staff to know when a reservation was created and who is coming for try-ons."
      }
      body={
        <div className="rounded-lg w-full p-2 flex flex-col overflow-y-auto overflow-x-hidden">
          <video className="w-full" controls>
            <source
              src="https://medusa-test.fra1.digitaloceanspaces.com/try-on-demo/reservations-filters.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      }
    />
  )
}
