export const getFrontendUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }

    // return "https://ataman.dev";
    return "http://localhost"
};


export const getBackendUrl = () => {
    if (process.env.NODE_ENV === "development") {
        if (typeof window !== "undefined") {
            // Browser-side request (Client Component)
            return "http://localhost:8000";
        } else {
            // Server-side request (Next.js inside Docker)
            return "http://api-ps:8000";
        }
    }

    // return "https://ataman.dev";
    return "http://localhost";
}
