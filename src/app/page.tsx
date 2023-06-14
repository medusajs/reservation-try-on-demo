"use client"

import { Explainer } from "@/components/common/explainer"

export default function Home() {
  return (
    <main className="flex flex-col items-center dark:bg-base-dark bg-base-light">
      <div className="h-full w-full flex">
        <div className="w-full flex flex-col gap-y-16 relative">
          <Explainer />
        </div>
      </div>
    </main>
  )
}
