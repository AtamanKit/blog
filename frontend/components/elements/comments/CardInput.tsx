import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";


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


export function CardInput({ post, truncFunc }: CardTemplateProps) {

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        
      </CardHeader>
      <CardContent>
        {/* <CardDescription>Log In to leave a comment!</CardDescription> */}
        <Textarea placeholder="Leave a comment here..." />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Send...</Button>
      </CardFooter>
    </Card>
  )
}
