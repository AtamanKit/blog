import type { NextConfig } from "next";
import { getFrontendUrl } from "@/utils/getBaseUrl";


const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "api-ps"], // ✅ Allow images from Django backend
  },
  env: {
    NEXT_PUBLIC_FACEBOOK_APP_ID: "1425931387716032",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: "929810369893-omv96b784ihvukf2oldpeod3sa6a0u1o.apps.googleusercontent.com",
    NEXT_PUBLIC_GITHUB_CLIENT_ID: "Ov23liw7PpS5nm1Iq6Bq",

    NEXT_PUBLIC_FRONTEND_REDIRECT_URI: getFrontendUrl(),
  }
};

export default nextConfig;
