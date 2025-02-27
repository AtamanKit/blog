"use client";
import { AuthHandler } from "@/components/auth/AuthHandler";

export function GoogleAuthHandler() {
    return <AuthHandler provider="google" apiEndpoint="/api/social/google/auth/google/" />;
}
