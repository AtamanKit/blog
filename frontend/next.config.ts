import type { NextConfig } from "next";
import { getFrontendUrl } from "@/utils/getBaseUrl";


const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // ✅ Allow images from Django backend
  },
  env: {
    NEXT_PUBLIC_FACEBOOK_APP_ID: "1425931387716032",
    NEXT_PUBLIC_FRONTEND_REDIRECT_URI: getFrontendUrl(),
  }
};

export default nextConfig;
