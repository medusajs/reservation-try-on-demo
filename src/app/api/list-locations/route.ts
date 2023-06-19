import { NextResponse } from "next/server"
import { getDbURL } from "@/lib/data/get-db-url"
import { initialize as initializeInventory } from "@medusajs/inventory"
import { initialize as initializeStockLocation } from "@medusajs/stock-location"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const invItem = searchParams.get("invItem")
  if (!invItem) {
    return NextResponse.json({
      try_on_locations: [],
    })
  }
  
  const moduleConfig = {
    database: {
      url: await getDbURL(),
      type: "postgres",
      extra: {
        ssl: { rejectUnauthorized: false },
      },
    },
  }

  const [inventoryService, stockLocationService] = await Promise.all([
    initializeInventory(moduleConfig),
    initializeStockLocation(moduleConfig),
  ])

  const [levels] = await inventoryService.listInventoryLevels(
    { inventory_item_id: invItem },
    {}
  )

  const levelsMap = new Map(levels.map((l) => [l.location_id, l]))

  const stockLocations = await stockLocationService.list(
    {
      id: levels.map((l) => l.location_id),
    },
    {}
  )

  return NextResponse.json({
    try_on_locations: stockLocations
      .filter((sl) => !!sl.metadata?.try_on)
      .map((sl) => {
        const level = levelsMap.get(sl.id)
        if (level) {
          return {
            ...sl,
            available: level.stocked_quantity - level.reserved_quantity,
          }
        }
        return sl
      }),
  })
}
