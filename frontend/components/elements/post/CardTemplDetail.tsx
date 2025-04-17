// "use client";

import * as React from "react";

import Image from "next/image";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// Define the shape of the post object
interface Post {
  id: number;
  title: string;
  image: string;
  description?: string;
  content?: string;
}


// Define props for the CardTemplate component
interface CardTemplateProps {
  post: Post;
  truncFunc?: React.ReactNode;
}


export function CardTemplDetail({ post }: CardTemplateProps) {
  // const pathname = usePathname();
  // const postList = !pathname.includes("post");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>

      </CardHeader>
      <CardContent>
        {/* <Image
            src={post.image}
            alt={post.title}
            width={1000}
            height={550}
            className={`w-full ${postList ? "h-48": ""} object-cover mb-4`}
        /> */}
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover mb-4`}
        />
        {/* {
          postList
          ? <CardDescription>{truncFunc}</CardDescription>
          : <CardDescription>{post.content}</CardDescription>
        } */}
        <CardDescription>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </CardDescription>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        {postList && (
          <Link href={`/post/${post.id}`}>
            <Button>More...</Button>
          </Link>
      )}
      </CardFooter> */}
    </Card>
  )
}
