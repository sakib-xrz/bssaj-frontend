import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import mission1 from "@/public/images/mission-01.png";
import mission2 from "@/public/images/mission-02.png";
import mission3 from "@/public/images/mission-03.png";
import Container from "@/components/shared/container";

const SupportMission: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
        {/* Left: Images */}
        <div className="flex w-full lg:w-1/2 gap-4">
          {/* Big Image (2/3) */}
          <div className="w-2/3">
            <Image
              src={mission1}
              alt="Main"
              className="w-full h-full object-cover rounded-xl"
              placeholder="blur"
            />
          </div>

          {/* Stacked Small Images (1/3) */}
          <div className="w-1/3 flex flex-col gap-4">
            <Image
              src={mission2}
              alt="Side 1"
              className="w-full h-full object-cover"
              placeholder="blur"
            />
            <Image
              src={mission3}
              alt="Side 2"
              className="w-full h-full object-cover"
              placeholder="blur"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-stretch">
          <Card className="w-full bg-gray-100 shadow-sm flex items-center rounded-none">
            <CardContent className="p-16 w-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-primary mb-4 text-center lg:text-left">
                Support Our Mission
              </h2>
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed text-center lg:text-left">
                Your donation helps us provide essential support services,
                scholarships, and resources for Bangladeshi students in Japan.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button className="bg-primary text-white px-6 py-3 rounded-md">
                  Donate Now
                </Button>
                <Button
                  variant="outline"
                  className="bg-primary border border-primary text-white px-6 py-3 rounded-md"
                >
                  Become a Sponsor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default SupportMission;
