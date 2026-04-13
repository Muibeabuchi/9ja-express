import { Armchair } from "lucide-react"
import { cn } from "@/lib/utils"

const Seat = ({
  isSelected,
  isAvailable,
  onClick,
  className,
}: {
  isSelected: boolean
  isAvailable: boolean
  onClick: () => void
  className?: string
}) => (
  <button
    onClick={onClick}
    disabled={!isAvailable}
    className={cn(
      "flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300",
      isSelected
        ? "signature-gradient text-white shadow-lg shadow-primary/30"
        : isAvailable
          ? "border border-outline-variant/30 bg-surface-container-lowest text-outline hover:border-primary/30 hover:bg-primary/5"
          : "cursor-not-allowed bg-surface-container-highest text-outline/20",
      className
    )}
  >
    <Armchair size={24} fill={isSelected ? "currentColor" : "none"} />
  </button>
)

export default Seat
