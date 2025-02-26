export function getSocialUser() {
    const storedUser = localStorage.getItem("socialUser");
    return storedUser ? JSON.parse(storedUser) : null;
}

export function removeSocialUser() {
    localStorage.removeItem("socialUser");
}
