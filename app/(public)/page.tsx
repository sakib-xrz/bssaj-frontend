import Hero from "@/app/(public)/_components/hero";

import React from "react";
import OurMission from "./_components/our-mission";
import UpcomingEvents from "./_components/upcoming-events";
import OurMembers from "./_components/our-members";
import SupportMission from "./_components/support-mission";
import ReadOurBlog from "./_components/read-our-blog";
import OurTrustedClients from "./_components/trusted-client";
import OurBigMoments from "./_components/big-moments";
import CertificateCheck from "./_components/certificate-check";
import Footer from "./_components/footer";
import LatestNews from "./_components/latest-news";
import StudentBorders from "./_components/student-borders";

export default function Home() {
  return (
    <div>
      <Hero />
      <OurMission />
      <LatestNews />
      <StudentBorders />
      <UpcomingEvents />
      <OurMembers />
      <SupportMission />
      <ReadOurBlog />
      <OurTrustedClients />
      <OurBigMoments />
      <CertificateCheck />
      <Footer />
    </div>
  );
}
