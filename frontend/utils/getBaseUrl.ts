export const getFrontendUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }

    return "https://ataman.dev";
};


export const getBackendUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:8000";
    }

    return "https://api.ataman.dev";
}

