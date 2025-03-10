"use client";

import * as React from "react";
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
import { useRouter } from "next/navigation";

// Define the shape of the post object
interface Post {
  id: number;
  title: string;
  image: string;
  description?: string;
  content?: string;
}

// Define props for the CardComment component
interface CardCommentProps {
  post: Post;
}

export function CardComment({ post }: CardCommentProps) {
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
      const response = await fetch(`${getBackendUrl()}/api/blog/posts/${post.id}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${socialUser.accessToken}`,
        },
        body: JSON.stringify({ text: commentText }), // Ensure field matches backend
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      setCommentText("");
      setError(null);
      router.refresh(); // Refresh page to load new comment
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
        <CardTitle>Comments</CardTitle>
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
