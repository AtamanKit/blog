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

    const socialUser = JSON.parse(socialUserString);

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
      const response = await fetch(
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

      const data = await response.json();

      // 🔐 Check if token expired
      if (response.status === 401 && data?.detail?.includes("expired")) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("socialUser");
        router.refresh();
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // await response.json(); // Ensure comment is fully saved before triggering UI update

      setCommentText("");
      setError(null);
      onCommentSuccess(); // 🔁 Trigger comment list refresh in parent
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
