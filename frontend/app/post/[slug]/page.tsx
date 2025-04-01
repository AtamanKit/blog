import { CardTemplDetail } from "@/components/elements/post/CardTemplDetail";
import { BreadcrumbTemplate } from "@/components/mains/Breadcrumb";
import { CardComment } from "@/components/elements/comments/CardComment";
import { SkeletonPost } from "@/components/elements/skeletons/SkeletonPost";
import CardComments from "@/components/elements/comments/CardComments";
import { getBackendUrl } from "@/utils/getBaseUrl";


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${getBackendUrl()}/api/blog/posts/${slug}/`);
  const post = await res.json();

  return (
    <main className="py-8">
      {post ? (
        <div>
          <BreadcrumbTemplate param={post.title} />
          <CardTemplDetail post={post} />
          <CardComment post={post} />
          <CardComments postId={post.id} />
        </div>
      ) : (
        <SkeletonPost />
      )}
    </main>
  );
}
