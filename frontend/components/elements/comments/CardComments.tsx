"use client";

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import SkeletonComments from "@/components/elements/skeletons/SkeletonComments"
import { getBackendUrl } from "@/utils/getBaseUrl";

interface Comment {
    id: number;
    text: string;
    created_at: string;
    post: number;
    user: {
        id: number;
        username: string;
        email: string;
        profile_picture?: string;
    };
}

export default function CardComments({ postId }: { postId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(
                    `${getBackendUrl()}/api/blog/posts/${postId}/comments/`,
                    {
                        method: "GET",
                        headers: {
                            // "Authorization": `Bearer ${accessToken}`,
                            "Accept": "application/json",
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                setComments(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Discussion for this post</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <SkeletonComments key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : comments.length > 0 ? (
                    <ul className="space-y-4">
                        {comments.map((comment) => (
                            <li key={comment.id} className="border-b pb-2">
                                <div className="flex items-center space-x-3">
                                    {comment.user.profile_picture && (
                                        <img
                                            src={comment.user.profile_picture}
                                            alt={comment.user.username}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold">{comment.user.username}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(comment.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2">{comment.text}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </CardContent>
            <CardFooter>
                <p>End of comments</p>
            </CardFooter>
        </Card>
    );
}