import Hero from "@/app/(public)/_components/hero";

import React from "react";
import ArticleList from "./_components/articleList";
import OurMission from "./_components/ourMission";
import UpcomingEvents from "./_components/upcomingEvents";
import OurMembers from "./_components/ourMembers";

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
