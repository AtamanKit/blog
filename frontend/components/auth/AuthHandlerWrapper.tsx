"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FacebookAuthHandler } from "./FacebookAuthHandler";
import { GoogleAuthHandler } from "./GoogleAuthHandler";

export function AuthHandlerWrapper() {
    const searchParams = useSearchParams();
    const [provider, setProvider] = useState<string | null>(null);

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) return;

        // Read the last login provider from localStorage
        const user = localStorage.getItem("socialUser");
        const storedProvider = user ? JSON.parse(user).provider : null;

        if (storedProvider === "facebook" || storedProvider === "google") {
            setProvider(storedProvider);
        }
    }, [searchParams]);

    if (!provider) return null; // ✅ Prevent rendering if no provider is found

    return provider === "google" ? <GoogleAuthHandler /> : <FacebookAuthHandler />;
}
