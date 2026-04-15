import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseVehicles(vehiclesStr?: string) {
  if (!vehiclesStr) return {}
  const items = vehiclesStr.split(",")
  const result: Record<string, number> = {}
  for (const item of items) {
    const [id, count] = item.split(":")
    if (id && count) {
      result[id] = parseInt(count, 10) || 0
    }
  }
  return result
}

export function stringifyVehicles(vehicles: Record<string, number>) {
  return (
    Object.entries(vehicles)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, count]) => count > 0)
      .map(([id, count]) => `${id}:${count}`)
      .join(",")
  )
}
