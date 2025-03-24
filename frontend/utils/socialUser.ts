export function getSocialUser() {
    if (typeof window === "undefined") return null;
    
    const storedUser = localStorage.getItem("socialUser");
    return storedUser ? JSON.parse(storedUser) : null;
}

export function removeSocialUser() {
    if (typeof window === "undefined") return;
    
    localStorage.removeItem("socialUser");
}
