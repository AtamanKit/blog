import Image from "next/image";
import { Label } from "@/components/elements/logo/Label";
import Link  from "next/link";


export function Logo() {
    return (
        <Link href="/" className="flex flex-col items-center">
            <Image
                src="images/svg/ataman.svg"
                width={30}
                height={30}
                alt="Ataman logo"
            />
            <Label />
        </Link>
    )
}