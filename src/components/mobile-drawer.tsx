import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import type { ReactNode } from "react"

export function MobileDrawer({
  triggerButton,
  children,
}: {
  triggerButton: ReactNode
  children: ReactNode
}) {
  return (
    <Drawer>
      <DrawerTrigger>{triggerButton}</DrawerTrigger>
      <DrawerContent className="flex h-full w-full flex-col border-l border-outline-variant/20 bg-surface-container-lowest p-0 outline-none sm:max-w-md">
        {children}
      </DrawerContent>
    </Drawer>
  )
}
