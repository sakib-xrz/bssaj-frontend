"use client";

import Container from "@/components/shared/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllCommieeQuery } from "@/redux/features/Committee/CommitteeApi";
import { Briefcase, Mail, Phone } from "lucide-react";

function Committee() {
  const { isLoading, data } = useGetAllCommieeQuery([
    { name: "limit", value: 999 },
  ]);

  if (isLoading) {
    return (
      <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-full">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        ))}
      </Container>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Container className="col-span-full text-center py-20 text-gray-500">
        <p className="text-lg md:text-xl">
          No committee members found at the moment. Please check back later!
        </p>
      </Container>
    );
  }

  const formatDesignation = (designation: string) =>
    designation
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#003366] mb-3">
          Executive Committee
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our dedicated committee members who work tirelessly to serve the
          community.
        </p>
      </div>

      <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
        {data.data.map((profile: any) => (
          <Card
            key={profile.id}
            className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white"
          >
            {/* Gradient top border - same as MemberCard */}
            <div className="h-2 bg-gradient-to-r from-[#003366]/90 to-[#00AEEF]/90" />

            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  {/* Avatar with ring effects - same as MemberCard */}
                  <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg group-hover:ring-[#00AEEF]/30 transition-all duration-300">
                    <AvatarImage
                      src={profile.profile_picture}
                      alt={profile.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-[#00AEEF] to-[#003366] text-white text-xl font-bold">
                      {profile.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Icon overlay - same as MemberCard */}
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r from-[#003366]/90 to-[#00AEEF]/90 rounded-full shadow-lg">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="mt-4 w-full">
                  {/* Name - same styling as MemberCard */}
                  <h3 className="font-bold text-[#003366] text-xl mb-2 group-hover:text-[#00AEEF] transition-colors">
                    {profile.name}
                  </h3>

                  {/* Badge - same styling as MemberCard */}
                  <Badge className="bg-gradient-to-r from-[#003366]/90 to-[#00AEEF]/90 text-white border-0 shadow-sm mb-3">
                    {formatDesignation(profile.designation)}
                  </Badge>

                  {/* Contact info - same structure as MemberCard */}
                  <div className="space-y-2 mb-4">
                    {profile.email && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{profile.email}</span>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom section - same layout as MemberCard */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-gray-500">
                      Joined {new Date(profile.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default Committee;
