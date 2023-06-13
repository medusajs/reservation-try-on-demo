"use client";

import { ExplainerBody } from "@/components/common/modal/explainer";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

type Props = {
  data: PricedProduct[] | null;
};

export default function Home() {
  return (
    <main className="flex flex-col items-center dark:bg-base-dark bg-base-light">
      <div className="h-full w-full flex">
        <div className="w-full flex flex-col gap-y-16 relative">
          <ExplainerBody />
        </div>
      </div>
    </main>
  );
}
