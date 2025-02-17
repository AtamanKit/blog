import { Logo } from "@/components/elements/logo/Logo";
import { MainMenu } from "@/components/elements/menus/main/MainMenu";
import { LogStyleMenu } from "@/components/elements/menus/logstyle/LogStyleMenu";

export default function HeadBar() {
    return (
        <div className="flex justify-between w-full my-8">
            <Logo />
            <MainMenu />
            <LogStyleMenu />
        </div>
    )
}