"use client";
import { AuthHandler } from "@/components/auth/AuthHandler";

export function GithubAuthHandler() {
    return <AuthHandler provider="github" apiEndpoint="/api/social/github/auth/github/" />;
}
