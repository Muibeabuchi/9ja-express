import { Bus } from "lucide-react"
// import { Button } from "../ui/button"

type Props = {
  SelectedCount: number
}

export default function HireFleetSummaryButton({ SelectedCount }: Props) {
  return (
    <button className="flex cursor-pointer items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 md:rounded-full">
      <Bus size={20} />
      View Summary ({SelectedCount})
    </button>
  )
}
