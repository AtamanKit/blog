"use client";


import { useEffect, useState } from "react";

import { PostCard } from "@/components/elements/post/PostCard";
import { SkeletonPosts } from "@/components/elements/skeletons/SkeletonPosts";


interface Post {
    id: number;
    title: string;
    image: string;
    description: string;
    [key: string]: any;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/blog/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div className="container mx-auto">
            {
                posts.length !== 0
                    ? posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                    : <SkeletonPosts />
            }
        </div>
    )
}
