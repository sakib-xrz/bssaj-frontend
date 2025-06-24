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
            <span className="block mb-4">
              <strong>From Bengal to Fuji</strong> represents a heartfelt
              academic and cultural voyage—where the spirit of learning
              transcends borders.
            </span>
            This initiative empowers Bangladeshi students to explore the beauty
            of the Japanese language, the depth of its culture, and the wisdom
            rooted in centuries-old traditions. Through immersive language
            programs, cultural exchange workshops, and scholarship guidance, it
            opens doors to new opportunities in education, friendship, and
            global understanding.
            <br />
            <br />
            Just as Mount Fuji symbolizes strength and serenity, this journey
            inspires young minds from Bengal to rise with ambition and purpose,
            embracing a world of knowledge beyond their horizon. Whether it’s
            mastering hiragana, appreciating the nuances of Japanese etiquette,
            or preparing for a future in Japan — this platform becomes the
            bridge between dreams and destinations.
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
