// Mark the entire file as a Client Component (required to use dynamic imports with `ssr: false`)
"use client";

import dynamic from "next/dynamic";

// Dynamically import the PostPageClientWrapper component
// `ssr: false` disables server-side rendering for this component
// This is necessary because PostPageClientWrapper uses hooks like useState/useEffect
const PostPageClientWrapper = dynamic(
  () => import("@/components/elements/post/PostPageClientWrapper"),
  { ssr: false }
);

// Shell component that receives the `slug` prop and renders the client-side wrapper
// Used in the main server-rendered page to defer all logic/rendering to the client
export default function PostPageShell({ slug }: { slug: string }) {
  return <PostPageClientWrapper slug={slug} />;
}
