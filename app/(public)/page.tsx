import Hero from "@/app/(public)/_components/hero";

import OurMission from "./_components/our-mission";
import UpcomingEvents from "./_components/upcoming-events";
import OurMembers from "./_components/our-members";
import SupportMission from "./_components/support-mission";
import ReadOurBlog from "./_components/read-our-blog";
import OurTrustedClients from "./_components/trusted-client";
import OurBigMoments from "./_components/big-moments";
import CertificateCheck from "./_components/certificate-check";
import LatestNews from "./_components/latest-news";
import StudentBorders from "./_components/student-borders";
import ScrollingTextMarquee from "./_components/text-marque";

export default function Home() {
  return (
    <div>
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
