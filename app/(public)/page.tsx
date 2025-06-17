import Hero from "@/app/(public)/_components/hero";

import React from "react";
import ArticleList from "./_components/articleList";

export default function Home() {
  return (
    <div>
      <Hero />
      <ArticleList />
    </div>
  );
}
