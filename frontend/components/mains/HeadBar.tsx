import { Label } from "../elements/Label"
import { MainMenu } from "../elements/menu/MainMenu"
import { ThemeToggle } from "../elements/ThemeToggle"


export default function HeadBar() {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex-grow">
                <Label />
            </div>
            <div className="flex-grow text-center">
                <MainMenu />
            </div>
            <div className="flex-grow text-right">
                <ThemeToggle />
            </div>
        </div>
    )
}