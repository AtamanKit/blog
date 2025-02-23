"use client";


import { useEffect, useState } from "react";
import { PostCard } from "@/components/elements/post/PostCard";


export default function Posts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8000/api/blog/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div className="container mx-auto">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}
