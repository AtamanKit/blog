"use client";
import { AuthHandler } from "@/components/auth/AuthHandler";

export function FacebookAuthHandler() {
    return <AuthHandler provider="facebook" apiEndpoint="/api/social/facebook/auth/facebook/" />;
}
