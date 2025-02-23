import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"

export function PopoverLogin() {
    const handleFacebookLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
        const redirectUri = process.env.NEXT_PUBLIC_FRONTEND_REDIRECT_URI;

        window.location.href = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile&response_type=code`;
    };
    
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Log In</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ul className="space-y-4 flex flex-col items-center">
            <li className="w-full px-4">
                <Button variant="outline" className="w-full">
                    <FcGoogle className="inline-block mr-2" />
                    Google
                </Button>
            </li>
            <li className="w-full px-4">
                <Button className="w-full">
                    <FaGithub className="inline-block mr-2" />
                    GitHub
                </Button>
            </li>
            <li className="w-full px-4">
                <Button className="w-full bg-blue-800 hover:bg-blue-700 text-slate-200">
                    <FaFacebook className="inline-block mr-2" />
                    Facebook
                </Button>
            </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
