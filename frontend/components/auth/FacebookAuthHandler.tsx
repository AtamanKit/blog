"use client";


import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBackendUrl } from "@/utils/getBaseUrl";
import { error } from "console";


export function FacebookAuthHandler() {
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
            const res = await fetch(`${getBackendUrl()}/api/social/auth/facebook/`, {
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
                localStorage.setItem("access_token", data.access_token);
                alert("Login successful!");
                router.replace(window.location.pathname);
            }
        } catch (error) {
            console.error("Login failed", error);
            setError("Login failed! Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )

}