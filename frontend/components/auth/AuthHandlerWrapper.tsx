"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FacebookAuthHandler } from "./FacebookAuthHandler";
import { GoogleAuthHandler } from "./GoogleAuthHandler";
import { GithubAuthHandler } from "./GithubAuthHandler";

export function AuthHandlerWrapper() {
    const searchParams = useSearchParams();
    const [provider, setProvider] = useState<string | null>(null);

    useEffect(() => {
        // Guard against SSR
        if (typeof window === "undefined") return;

        const code = searchParams.get("code");
        if (!code) return;

        // Read the last login provider from localStorage
        const user = localStorage.getItem("socialUser");
        const storedProvider = user ? JSON.parse(user).provider : null;

        if (["facebook", "google", "github"].includes(storedProvider)) {
            setProvider(storedProvider);
        }
    }, [searchParams]);

    if (!provider) return null;

    return provider === "google" ? <GoogleAuthHandler />
        : provider === "facebook" ? <FacebookAuthHandler />
        : provider === "github" ? <GithubAuthHandler />
        : null;
}
