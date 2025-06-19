import Hero from "@/app/(public)/_components/hero";

import React from "react";
import ArticleList from "./_components/articleList";
import OurMission from "./_components/ourMission";

export default function Home() {
  return (
    <div>
      <Hero />
      <OurMission />
      <ArticleList />
    </div>
  );
}
