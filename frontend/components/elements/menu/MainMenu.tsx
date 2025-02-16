import { Wide } from "@/components/elements/menu/Wide"
import { Narrow } from "@/components/elements/menu/Narrow"


export function MainMenu() {
  return (
    <main>
        <div className="max-md:hidden">
            <Wide />
        </div>
        <div className="md:hidden">
            <Narrow />
        </div>
    </main>
  )
}