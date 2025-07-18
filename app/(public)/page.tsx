import Hero from "@/app/(public)/_components/hero";

import Navbar from "@/components/shared/navbar";
import OurBigMoments from "./_components/big-moments";
import CertificateCheck from "./_components/certificate-check";
import LatestNews from "./_components/latest-news";
import OurMembers from "./_components/our-members";
import OurMission from "./_components/our-mission";
import ReadOurBlog from "./_components/read-our-blog";
import StudentBorders from "./_components/student-borders";
import SupportMission from "./_components/support-mission";
import ScrollingTextMarquee from "./_components/text-marque";
import OurTrustedClients from "./_components/trusted-client";
import UpcomingEvents from "./_components/upcoming-events";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ScrollingTextMarquee />
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
    </div>
  );
}
