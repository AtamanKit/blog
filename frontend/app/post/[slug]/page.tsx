import PostPageShell from "@/components/mains/PostPageShell";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="py-8">
      <PostPageShell slug={slug} />
    </main>
  );
}
