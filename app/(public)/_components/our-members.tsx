"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const memberCards = [
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Founder",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Co-founder",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Member",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Member",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Another Member",
    role: "Volunteer",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Third Member",
    role: "Advisor",
    imageUrl: "/images/member1.png",
  },
];

const OurMembers: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Members
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Partnering with leading organizations to support Bangladeshi students
          in Japan.
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          // Add other options if needed
        }}
        className="w-full"
      >
        <CarouselContent className="gap-6">
          {memberCards.map((member, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex-none"
            >
              <Card className="h-80 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer">
                <CardContent className="flex flex-col items-center p-0 h-full">
                  <div className="w-full flex-grow flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-100">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-t-xl"
                      onError={(e) => {
                        console.error("Image failed to load:", e);
                      }}
                    />
                  </div>
                  <CardHeader className="text-center p-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 shadow-md text-gray-800 hover:bg-gray-200 transition">
          {/* You can put an icon here, e.g., left arrow */}
          &#8592;
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 shadow-md text-gray-800 hover:bg-gray-200 transition">
          {/* You can put an icon here, e.g., right arrow */}
          &#8594;
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default OurMembers;
