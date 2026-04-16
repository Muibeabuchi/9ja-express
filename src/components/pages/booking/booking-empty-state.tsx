import { Bus, ChevronRight } from "lucide-react"

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low py-16 text-center">
      <div className="mb-4 rounded-full bg-surface-container-lowest p-4">
        <Bus size={32} className="text-outline" />
      </div>
      <h3 className="font-headline text-xl font-bold text-on-surface">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-on-surface-variant">{description}</p>
      <button
        onClick={onAction}
        className="signature-gradient mt-6 flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white"
      >
        {actionLabel}
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
