import Image from "next/image";
import React from "react";

import HelloWorld from "@/components/mains/HelloWorld";
import HeadBar from "@/components/mains/HeadBar";


export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-8">
      <header className="my-8">
        <HeadBar />
      </header>
      <HelloWorld />
    </main>
  );
}
