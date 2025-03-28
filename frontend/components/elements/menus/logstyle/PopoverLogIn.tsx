import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import { getFrontendUrl } from "@/utils/getBaseUrl";


export function PopoverLogIn() {
  const handleLogin = (provider: "facebook" | "google" | "github") => {
    let clientId;
    let authUrl;

    const redirectUri = encodeURIComponent(`${getFrontendUrl()}/auth/`);

    if (provider === "facebook") {
      clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
      authUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile&response_type=code`;
    } else if (provider === "google") {
      clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile&response_type=code`;
    } else if (provider === "github") {
      clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    }

    // console.log(`Logging in with ${provider}:`, clientId, redirectUri);

    // localStorage.setItem("authProvider", provider);
    localStorage.setItem("socialUser", JSON.stringify({ provider, afterLoginUrl: window.location.href }));

    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Log In</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ul className="space-y-4 flex flex-col items-center">
          <li className="w-full px-4">
            <Button
              onClick={() => handleLogin("google")}
              variant="outline"
              className="w-full"
            >
              <FcGoogle className="inline-block mr-2" />
              Google
            </Button>
          </li>
          <li className="w-full px-4">
            <Button
              onClick={() => handleLogin("github")}
              className="w-full"
            >
              <FaGithub className="inline-block mr-2" />
              GitHub
            </Button>
          </li>
          <li className="w-full px-4">
            <Button
              onClick={() => handleLogin("facebook")}
              className="w-full bg-blue-800 hover:bg-blue-700 text-slate-200"
            >
              <FaFacebook className="inline-block mr-2" />
              Facebook
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
