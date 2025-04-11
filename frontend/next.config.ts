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

    // === Backend OAuth2 App credentials (used for refreshing tokens)
    NEXT_PUBLIC_OAUTH2_FACEBOOK_CLIENT_ID: "Z6n9JdxAbGoZkxmQGPggiO1ulkE1gpPBuX2RkEdT",
    NEXT_PUBLIC_OAUTH2_FACEBOOK_CLIENT_SECRET: "3XfFjMNBforKjVnFy9FpP6MID89ozbiOkl6xZTSEzMOvclUraqx87mAk6PNA98r3Y3UlqLHbeBHaAj7LA3oSBMJHOh6boNtVRYKtzp1P1mYzcjjcLAGSe61FK3pkArXe",

    NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_ID: "e5pS6UF6smFB2cRe7DcrrwbYzb4XONZiySnfJEAI",
    NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_SECRET: "M46Qj2BDlFnuGbQIsIbdSVkmmV6lBR6kj4DUV29qA3ZbIFBgeO0BkuH2X1OGWP8PIPB1jOhebDWxYzzuZgF5W6TaJICikKORDJp1Oo16C4ze4prVqVqKFcmFAJQ3095r",

    NEXT_PUBLIC_OAUTH2_GITHUB_CLIENT_ID: "4Czpm4oCv0CjHJA41C3eRRZ4ZGsWyD0kf0rh0Ihz",
    NEXT_PUBLIC_OAUTH2_GITHUB_CLIENT_SECRET: "wfua0wnEAuN7UlgxtpJ09KnXPXVawiHMSj6IGU6LM5P3MOTipSVzbxfkCIbTocjyLRf0lM1mOGDdHsDNYQ9Jq5QS18lVCZ6DQcJLvhXDY178HBoJbTmA9bcyiLtyqfv6",

    NEXT_PUBLIC_FRONTEND_REDIRECT_URI: getFrontendUrl(),
  }
};

export default nextConfig;
