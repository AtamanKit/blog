import { Wide } from "@/components/elements/menus/main/Wide"
import { Narrow } from "@/components/elements/menus/main/Narrow"


export function MainMenu() {
  return (
    <main className="flex items-center">
      <div className="max-md:hidden">
        <Wide />
      </div>
      <div className="md:hidden">
        <Narrow />
      </div>
    </main>
  )
}