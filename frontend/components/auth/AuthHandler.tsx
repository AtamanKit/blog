"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBackendUrl } from "@/utils/getBaseUrl";

interface AuthHandlerProps {
    provider: "facebook" | "google";
    apiEndpoint: string; // Example: "/api/social/facebook/auth/facebook/"
}

export function AuthHandler({ provider, apiEndpoint }: AuthHandlerProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            exchangeCodeForToken(code);
        }
    }, [searchParams]);

    const exchangeCodeForToken = async (code: string) => {
        setLoading(true);
        try {
            const redirectUri = window.location.href.split("?")[0];
            const res = await fetch(`${getBackendUrl()}${apiEndpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code, redirect_uri: redirectUri }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();

            if (data.access_token) {
                const socialUser = {
                    accessToken: data.access_token,
                    email: data.user?.email || "",
                    userName: data.user?.name || "",
                    userPicture: data.user?.picture || "",
                };

                localStorage.setItem("socialUser", JSON.stringify(socialUser));

                router.replace(window.location.pathname);
            }
        } catch (error) {
            console.error(`Login failed for ${provider}`, error);
            setError(`Login failed! Please try again!`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}
