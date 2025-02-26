import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AvatarTempl } from "@/components/elements/AvatarTempl";
import { getSocialUser, removeSocialUser } from "@/utils/socialUser";


export function PopoverLogOut() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const socialUser = getSocialUser();
    
    setUserImage(socialUser?.userPicture);
    setUserName(socialUser?.userName);
  }, []);

  const handleLogout = () => {
    // Remove user from localStorage
    removeSocialUser();
    
    // Reset state
    setUserImage(null);
    setUserName(null);

    // Reload page
    window.location.reload();
  };

  const fallback = userName ? userName[0].toUpperCase() : "U";
    
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
        <AvatarTempl 
        userIm={userImage}
        alt={`${userName}'s profile picture`}
        fallback={fallback}
        />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex justify-center">
        <Button onClick={handleLogout}>Log Out</Button>
      </PopoverContent>
    </Popover>
  )
}
