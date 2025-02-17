import Image from "next/image";
import React from "react";

import HelloWorld from "@/components/mains/HelloWorld";
import HeadBar from "@/components/mains/HeadBar";


export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-8">
      <header className="flex w-screen border-b">
        <div className="flex container w-full">
          <HeadBar />
        </div>
      </header>
      <HelloWorld />
    </main>
  );
}
