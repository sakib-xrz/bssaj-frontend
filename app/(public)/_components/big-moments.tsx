import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Container from "@/components/shared/container";

interface MomentCardProps {
  id: string;
  imageSrc: string;
  title: string;
}

const momentCards: MomentCardProps[] = [
  {
    id: "1",
    imageSrc: "/images/moments.png",
    title: "Bangladesh Student Japan",
  },
  {
    id: "2",
    imageSrc: "/images/moments.png",
    title: "Bangladesh Student Japan",
  },
  {
    id: "3",
    imageSrc: "/images/moments.png",
    title: "Bangladesh Student Japan",
  },
  {
    id: "4",
    imageSrc: "/images/moments.png",
    title: "Bangladesh Student Japan",
  },
  {
    id: "5",
    imageSrc: "/images/moments.png",
    title: "Bangladesh Student Japan",
  },
  {
    id: "6",
    imageSrc: "/images/moments.png",
    title: "Bangladesh Student Japan",
  },
];

const OurBigMoments: React.FC = () => {
  return (
    <Container className="py-12 flex flex-col items-center">
      {/* Top Section: Heading and Paragraph */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Big Moments
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A glimpse into our journey, achievements, and celebrations.
        </p>
      </div>

      {/* Moment Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
        {momentCards.map((moment) => (
          <Card
            key={moment.id}
            className="flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="p-0">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={moment.imageSrc}
                  alt={moment.title}
                  fill
                  className="rounded-t-xl object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {moment.title}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <Button className="bg-primary text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg">
        View All
      </Button>
    </Container>
  );
};

export default OurBigMoments;
