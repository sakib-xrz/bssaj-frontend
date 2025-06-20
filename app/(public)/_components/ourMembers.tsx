"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface MemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
}

// Dummy data for member cards
const memberCards: MemberCardProps[] = [
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center">
      {/* Top Section: Heading and Paragraph */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Members
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Partnering with leading organizations to support Bangladeshi students
          in Japan.
        </p>
      </div>

      {/* Members Carousel Section */}
      <div className="relative w-full max-w-6xl px-8">
        {" "}
        {/* Added px-8 */}
        {/* Scroll Buttons */}
        <Button
          onClick={scrollLeft}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-[#F0F0F0] text-gray-800 rounded-full shadow-md z-20 p-2 hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <Button
          onClick={scrollRight}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-[#F0F0F0] text-gray-800 rounded-full shadow-md z-20 p-2 hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
        {/* Members Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar py-4 space-x-6 scroll-smooth"
        >
          {memberCards.map((member, index) => (
            <Card
              key={index}
              className="flex-none w-72 h-80 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurMembers;
