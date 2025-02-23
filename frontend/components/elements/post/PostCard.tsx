import * as React from "react";

import { CardTemplate } from "@/components/elements/post/CardTemplate";


// Define the shape of the post object
interface Post {
  id: number;
  title: string;
  image: string;
  description: string;
}

// A helper function to truncate text to a given number of words
function truncateWords(text: string, wordLimit: number): string {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  
// Custom hook to get current window width (works only in the browser)
function useScreenWidth(): number {
  const [width, setWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}


interface PostCardProps {
  post: Post;
}


export function PostCard({ post }: PostCardProps) {
    const width = useScreenWidth();

  // Define word limits based on screen width.
  // For example: small screens show fewer words, larger screens show more.
  let wordLimit: number = 100;
  if (width < 640) {
    wordLimit = 10;
  } else if (width < 1024) {
    wordLimit = 25;
  }

  const truncatedDescription = truncateWords(post.description, wordLimit);

  return (
    <CardTemplate
      post={post}
      truncFunc={truncatedDescription} 
    />
  )
}
