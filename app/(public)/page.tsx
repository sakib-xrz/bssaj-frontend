import Hero from "@/app/(public)/_components/hero";

import React from "react";
import ArticleList from "./_components/article-list";
import OurMission from "./_components/our-mission";
import UpcomingEvents from "./_components/upcoming-events";
import OurMembers from "./_components/our-members";

export default function Home() {
  return (
    <div>
      <Hero />
      <OurMission />
      <ArticleList />
      <UpcomingEvents />
      <OurMembers />
    </div>
  );
}
