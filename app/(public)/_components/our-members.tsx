"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Award,
  Briefcase,
  Crown,
  GraduationCap,
  Mail,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { useGetMembersQuery } from "@/redux/features/member/memberApi";
import { Member } from "../(home)/members/_components/member-card";

const memberKindIcons = {
  ADVISER: Crown,
  HONORABLE: Award,
  EXECUTIVE: Briefcase,
  ASSOCIATE: Star,
  STUDENT_REPRESENTATIVE: GraduationCap,
};

const memberKindGradients = {
  ADVISER: "from-[#003366] to-[#004080]",
  HONORABLE: "from-[#00AEEF] to-[#0099CC]",
  EXECUTIVE: "from-[#003366]/90 to-[#00AEEF]/90",
  ASSOCIATE: "from-[#00AEEF]/80 to-[#003366]/80",
  STUDENT_REPRESENTATIVE: "from-gray-600 to-gray-700",
};

const memberKindLabels = {
  ADVISER: "Adviser",
  HONORABLE: "Honorable Member",
  EXECUTIVE: "Executive",
  ASSOCIATE: "Associate",
  STUDENT_REPRESENTATIVE: "Student Representative",
};

export default function OurMembers() {
  const { data, isLoading, isError, error } = useGetMembersQuery({});
  const fetchedMembers: Member[] = data?.data || [];

  const memberKindPriority = {
    ADVISER: 1,
    HONORABLE: 2,
    EXECUTIVE: 3,
    ASSOCIATE: 4,
    STUDENT_REPRESENTATIVE: 5,
  };

  const sortedMembers = [...fetchedMembers].sort(
    (a, b) =>
      memberKindPriority[a.kind as keyof typeof memberKindPriority] -
      memberKindPriority[b.kind as keyof typeof memberKindPriority]
  );

  if (isLoading) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-primary">Loading members...</p>
      </Container>
    );
  }

  if (isError) {
    console.error("Failed to fetch members:", error);
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-red-500">
          Error loading members. Please try again later.
        </p>
      </Container>
    );
  }

  if (!sortedMembers.length) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-gray-600">No members found.</p>
      </Container>
    );
  }

  const showCarouselNavigation = sortedMembers.length > 4;

  return (
    <Container className="flex flex-col items-center w-full mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Members
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Partnering with leading organizations to support Bangladeshi students
          in Japan.
        </p>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {sortedMembers.map((member) => {
            const Icon =
              memberKindIcons[member.kind as keyof typeof memberKindIcons];

            return (
              <CarouselItem
                key={member.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4"
              >
                <Card className="group rounded-2xl overflow-hidden bg-white border transition-all duration-300">
                  <div
                    className={`h-2 bg-gradient-to-r ${
                      memberKindGradients[
                        member.kind as keyof typeof memberKindGradients
                      ]
                    }`}
                  />
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 rounded-full ring-4 ring-white shadow-md overflow-hidden">
                        <AvatarImage
                          src={member?.user?.profile_picture || ""}
                          alt={member.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                            target.onerror = null;
                          }}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#00AEEF] to-[#003366] text-white text-xl font-bold">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r ${
                          memberKindGradients[
                            member.kind as keyof typeof memberKindGradients
                          ]
                        } rounded-full shadow-lg`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-[#003366] mb-2 group-hover:text-[#00AEEF] transition-colors">
                      {member.name}
                    </h3>

                    <Badge
                      className={`text-xs bg-gradient-to-r ${
                        memberKindGradients[
                          member.kind as keyof typeof memberKindGradients
                        ]
                      } text-white border-0 px-3 py-1 mb-3`}
                    >
                      {
                        memberKindLabels[
                          member.kind as keyof typeof memberKindLabels
                        ]
                      }
                    </Badge>

                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full mt-2 text-xs text-gray-500">
                      <div>
                        Joined{" "}
                        {new Date(member.created_at).toLocaleDateString()}
                      </div>
                      <Button
                        size="sm"
                        className="text-white px-3 py-1 text-sm bg-gradient-to-r from-[#00AEEF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00AEEF] transition"
                        asChild
                      >
                        <Link href={`/members/${member.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {showCarouselNavigation && (
          <>
            <CarouselPrevious className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
            <CarouselNext className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
          </>
        )}
      </Carousel>
    </Container>
  );
}
