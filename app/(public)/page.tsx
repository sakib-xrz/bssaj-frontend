import Hero from "@/app/(public)/_components/hero";

import React from "react";
import ArticleList from "./_components/article-list";
import OurMission from "./_components/our-mission";
import UpcomingEvents from "./_components/upcoming-events";
import OurMembers from "./_components/our-members";
import SupportMission from "./_components/support-mission";
import ReadOurBlog from "./_components/read-our-blog";
import OurTrustedClients from "./_components/trusted-client";
import OurBigMoments from "./_components/big-moments";
import CertificateCheck from "./_components/certificate-check";

export default function Home() {
  return (
    <div>
      <Hero />
      <OurMission />
      <ArticleList />
      <UpcomingEvents />
      <OurMembers />
      <SupportMission />
      <ReadOurBlog />
      <OurTrustedClients />
      <OurBigMoments />
      <CertificateCheck />
    </div>
  );
}
