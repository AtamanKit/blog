// This is a client-side React component that serves as a wrapper for the Post details page.
// It handles fetching the blog post by slug, displaying the post details,
// showing existing comments, and allowing the user to submit a new comment.
// When a new comment is submitted, the comments list is refreshed automatically.

"use client";

import { useEffect, useState } from "react";
import { CardTemplDetail } from "@/components/elements/post/CardTemplDetail";
import { BreadcrumbTemplate } from "@/components/mains/Breadcrumb";
import { CardComment } from "@/components/elements/comments/CardComment";
import CardComments from "@/components/elements/comments/CardComments";
import { SkeletonPost } from "@/components/elements/skeletons/SkeletonPost";
import { getBackendUrl } from "@/utils/getBaseUrl";

export default function PostPageClientWrapper({ slug }: { slug: string }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`${getBackendUrl()}/api/blog/posts/${slug}/`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [slug]);

  if (!post) return <SkeletonPost />;

  return (
    <>
      <BreadcrumbTemplate param={post.title} />
      <CardTemplDetail post={post} />
      <CardComment post={post} onCommentSuccess={() => setRefreshKey((prev) => prev + 1)} />
      <CardComments key={refreshKey} postId={post.id} />
    </>
  );
}
