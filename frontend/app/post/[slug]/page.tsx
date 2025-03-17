import { JSX } from "react";

import { CardTempl } from "@/components/elements/post/CardTempl";
import { BreadcrumbTemplate } from "@/components/mains/Breadcrumb";
import { CardComment } from "@/components/elements/comments/CardComment";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonPost } from "@/components/elements/skeletons/SkeletonPost";
import CardComments from "@/components/elements/comments/CardComments";


interface Post {
  title: string;
  image: string;
  content: string;
  slug: string;
}


export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts: Post[] = await fetch("http://localhost:8000/api/blog/posts").then((res) =>
    res.json()
  );

  return posts.map((post) => ({
    slug: post.slug,
  }));
}


interface Params {
  slug: string;
}


export default async function Post({ params }: { params: Params }): Promise<JSX.Element> {
  const { slug } = params;
  const res = await fetch(`http://localhost:8000/api/blog/posts/${slug}`);
  const post = await res.json();

  console.log(post);

  return (
    <main className="py-8">
      {post ? (
        <div>
          <BreadcrumbTemplate param={post.title} />
          <CardTempl post={post} />
          <CardComment post={post} />
          <CardComments postId={post.id} />
        </div>
      ) : (
        <SkeletonPost />
      )}
    </main>
  );
}

