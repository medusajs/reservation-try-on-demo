import { Button } from "../button"
import { Medusa } from "@/components/icons/medusa"
import { Nextjs } from "@/components/icons/nextjs"
import { useState } from "react"

const Hero = () => {
  const [showExplainer, setShowExplainer] = useState(false)
  return (
    <div className="relative h-96 w-full overflow-hidden dark:bg-base-dark shadow-card-hover-light bg-base-light dark:shadow-card-hover-dark rounded-2xl">
      <div className="absolute inset-0 bg-[url('/hero.svg')] bg-cover dark:invert-0 invert" />
      <div className="absolute inset-0 flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="text-base-light dark:text-base-dark text-4xl">
            Book Try-on Demo
          </div>
          <div className="text-subtle-light dark:text-subtle-dark text-4xl">
            Powered by Medusa.
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-subtle-light dark:text-subtle-dark max-w-[399px] text-center">
          This demo uses
          <span className="flex flex-row items-center gap-1">
            <Nextjs />
            Next.js
          </span>
          and
          <span className="flex flex-row items-center gap-1">
            <Medusa /> Medusa
          </span>
          modules for personalization.
        </div>
        <Button variant="inverted" onClick={() => setShowExplainer(true)}>
          Read More
        </Button>
      </div>
    </div>
  )
}

export default Hero
