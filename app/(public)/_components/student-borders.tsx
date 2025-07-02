import Container from "@/components/shared/container";

const StudentBorders: React.FC = () => {
  return (
    <Container className="flex flex-col items-center py-12">
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Students Without Borders
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join us for these exciting upcoming events and activities.
        </p>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 w-full px-4">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center lg:text-left">
            A Student’s Journey Through the Language and Legacy of Japan
          </h2>
          <p className="text-base text-gray-600 leading-relaxed text-justify">
            May 31, 2025 on behalf of BSSAJ – Bangladeshi Students’ Support Association in Japan, our honorable President Mr. Faruq Nagamatsu presented the current challenges related to student visas from Bangladesh to our Chief Adviser, Professor Muhammad Yunus. <br /> <br />

            He elaborated on the barriers faced by Bangladeshi students in coming to Japan, visa complications, and possible future actions to ease the process. <br /> <br />

            BSSAJ remains committed to representing the voice of Bangladeshi students and advocating for their support at the highest levels.
          </p>
        </div>

        {/* Video Section */}
        <div className="w-full lg:w-1/2 aspect-video rounded-xl overflow-hidden shadow-md">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/B9VRvOKKwfs?si=6O7iwAxNbhl8FCIW"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Container>
  );
};

export default StudentBorders;
