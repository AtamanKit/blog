// This function is used to get the OAuth credentials from environment variables.
export function getOAuthCredentials(provider: string) {
    switch (provider) {
        case "google":
            return {
                client_id: process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_ID!,
                client_secret: process.env.NEXT_PUBLIC_OAUTH2_GOOGLE_CLIENT_SECRET!,
            };
        case "facebook":
            return {
                client_id: process.env.NEXT_PUBLIC_OAUTH2_FACEBOOK_CLIENT_ID!,
                client_secret: process.env.NEXT_PUBLIC_OAUTH2_FACEBOOK_CLIENT_SECRET!,
            };
        case "github":
            return {
                client_id: process.env.NEXT_PUBLIC_OAUTH2_GITHUB_CLIENT_ID!,
                client_secret: process.env.NEXT_PUBLIC_OAUTH2_GITHUB_CLIENT_SECRET!,
            };
        default:
            throw new Error("Unsupported OAuth provider");
    }
}

// This function is used to refresh the access token using the refresh token.
export async function refreshAccessToken(backendUrl: string, refreshToken: string, clientId: string, clientSecret: string) {
    const response = await fetch(`${backendUrl}/o/token/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to refresh token");
    }

    return response.json(); // Returns new { access_token, refresh_token }
}
