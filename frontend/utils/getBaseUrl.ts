// export const getFrontendUrl = () => {
//     if (process.env.NODE_ENV === "development") {
//         return "http://localhost:3000";
//     }

//     // return "https://ataman.dev";
//     return "http://localhost"
// };


// export const getBackendUrl = () => {
//     if (process.env.NODE_ENV === "development") {
//         if (typeof window !== "undefined") {
//             // Browser-side request (Client Component)
//             return "http://localhost:8000";
//         } else {
//             // Server-side request (Next.js inside Docker)
//             return "http://api-ps:8000";
//         }
//     }

//     // return "https://ataman.dev";
//     return "http://localhost";
// }
export const getFrontendUrl = () => {
    if (typeof window !== "undefined") {
      // Client-side: use actual browser origin
      return window.location.origin;
    }
  
    // Server-side:
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }
  
    return "http://localhost";
    // return "https://ataman.dev";
  };

  
  export const getBackendUrl = () => {
    if (typeof window !== "undefined") {
      // Client-side: proxy via Nginx
      return window.location.origin;
    }
  
    // Server-side:
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:8000";
    }
  
    // Inside Docker container
    return "http://api-ps:8000";
  };


  export const getMediaUrl = (imagePath: string) => {
    if (!imagePath) return "";
  
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      return `http://localhost:8000${imagePath}`;
    }
  
    return `${getFrontendUrl()}${imagePath}`;
  };
  