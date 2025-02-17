import Image from "next/image";
import { Label } from "@/components/elements/logo/Label";

export function Logo() {
    return (
        <main className="flex flex-col items-center">
            <Image
                src="images/svg/ataman.svg"
                width={30}
                height={30}
                alt="Ataman logo"
            />
            <Label />
        </main>
    )
}