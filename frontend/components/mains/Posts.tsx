"use client";


import { useEffect, useState } from "react";

import { PostCard } from "@/components/elements/post/PostCard";
import { SkeletonPosts } from "@/components/elements/skeletons/SkeletonPosts";
import { getBackendUrl } from "@/utils/getBaseUrl";


interface Post {
    id: number;
    title: string;
    image: string;
    description: string;
    [key: string]: any;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    console.log("#######################################pst:", `${getBackendUrl()}/api/blog/posts`);

    useEffect(() => {
        fetch(`${getBackendUrl()}/api/blog/posts`)
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    console.log("#######################################pst:", posts);

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
