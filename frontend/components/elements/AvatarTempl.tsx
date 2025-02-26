import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarTempl({ userIm, alt, fallback }: { userIm: string | null; alt: string; fallback: string }) {
    return (
      <Avatar>
        <AvatarImage src={userIm ?? undefined} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    )
  }
