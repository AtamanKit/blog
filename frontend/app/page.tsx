import React from "react";

import HeadBar from "@/components/mains/HeadBar";
import Posts from "@/components/mains/Posts";


export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-8">
      <header className="flex w-screen border-b">
        <div className="flex container w-full">
          <HeadBar />
        </div>
      </header>
      <section className="container w-full">
        <Posts />
      </section>
    </main>
  );
}
