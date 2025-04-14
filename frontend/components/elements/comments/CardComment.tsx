// "use client";

// import * as React from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";

// import { getBackendUrl } from "@/utils/getBaseUrl";

// interface Post {
//   id: number;
//   title: string;
//   image: string;
//   description?: string;
//   content?: string;
// }

// interface CardCommentProps {
//   post: Post;
//   onCommentSuccess: () => void;
// }


// export function CardComment({ post, onCommentSuccess }: CardCommentProps) {
//   const [commentText, setCommentText] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState<string | null>(null);
//   const router = useRouter();


//   const handleCommentSubmit = async () => {
//     const socialUserString = localStorage.getItem("socialUser");

//     if (!socialUserString) {
//       setError("Please log in to leave a comment!");
//       return;
//     }

//     const socialUser = JSON.parse(socialUserString);

//     if (!socialUser.accessToken) {
//       setError("Invalid session. Please log in again.");
//       return;
//     }

//     if (!commentText.trim()) {
//       setError("Comment cannot be empty!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `${getBackendUrl()}/api/blog/posts/${post.id}/comments/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${socialUser.accessToken}`,
//           },
//           body: JSON.stringify({ text: commentText }),
//         }
//       );

//       const data = await response.json();

//       // 🔐 Check if token expired
//       if (response.status === 401 && data?.detail?.includes("expired")) {
//         setError("Session expired. Please log in again.");
//         localStorage.removeItem("socialUser");
//         router.refresh();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       // await response.json(); // Ensure comment is fully saved before triggering UI update

//       setCommentText("");
//       setError(null);
//       onCommentSuccess(); // 🔁 Trigger comment list refresh in parent
//     } catch (err) {
//       setError("Failed to submit comment. Please try again!");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Leave a Comment</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Textarea
//           placeholder="Leave a comment here..."
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//         />
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button onClick={handleCommentSubmit} disabled={loading}>
//           {loading ? "Sending..." : "Send"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { getBackendUrl } from "@/utils/getBaseUrl";
import { getOAuthCredentials, refreshAccessToken } from "@/utils/refreshAccessToken";

interface Post {
  id: number;
  title: string;
  image: string;
  description?: string;
  content?: string;
}

interface CardCommentProps {
  post: Post;
  onCommentSuccess: () => void;
}

export function CardComment({ post, onCommentSuccess }: CardCommentProps) {
  const [commentText, setCommentText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleCommentSubmit = async () => {
    const socialUserString = localStorage.getItem("socialUser");

    if (!socialUserString) {
      setError("Please log in to leave a comment!");
      return;
    }

    let socialUser = JSON.parse(socialUserString);

    if (!socialUser.accessToken) {
      setError("Invalid session. Please log in again.");
      return;
    }

    if (!commentText.trim()) {
      setError("Comment cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      let response = await fetch(
        `${getBackendUrl()}/api/blog/posts/${post.id}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${socialUser.accessToken}`,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      let data = await response.json();

      // 🔐 Try refreshing token if expired
      if (response.status === 401 && data?.detail?.includes("expired")) {
        try {
          const { client_id, client_secret } = getOAuthCredentials(socialUser.provider);
          const tokenData = await refreshAccessToken(
            getBackendUrl(),
            socialUser.refreshToken,
            client_id,
            client_secret
          );

          // Update localStorage and retry
          socialUser.accessToken = tokenData.access_token;
          socialUser.refreshToken = tokenData.refresh_token || socialUser.refreshToken;
          localStorage.setItem("socialUser", JSON.stringify(socialUser));

          // Retry the comment submission
          response = await fetch(`${getBackendUrl()}/api/blog/posts/${post.id}/comments/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${socialUser.accessToken}`,
            },
            body: JSON.stringify({ text: commentText }),
          });

          data = await response.json();
        } catch (refreshErr) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("socialUser");
          setLoading(false);
          router.refresh();
          return;
        }
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setCommentText("");
      setError(null);
      onCommentSuccess();
    } catch (err) {
      setError("Failed to submit comment. Please try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Leave a comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleCommentSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </CardFooter>
    </Card>
  );
}
