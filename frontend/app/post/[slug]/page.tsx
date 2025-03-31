import { CardTempl } from "@/components/elements/post/CardTempl";
import { BreadcrumbTemplate } from "@/components/mains/Breadcrumb";
import { CardComment } from "@/components/elements/comments/CardComment";
import { SkeletonPost } from "@/components/elements/skeletons/SkeletonPost";
import CardComments from "@/components/elements/comments/CardComments";
import { getBackendUrl } from "@/utils/getBaseUrl";


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("#######################################pst:", slug);
  const res = await fetch(`${getBackendUrl()}/api/blog/posts/${slug}/`);
  console.log("#######################################pst:", `${getBackendUrl()}/api/blog/posts/${slug}/`);
  const post = await res.json();

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
