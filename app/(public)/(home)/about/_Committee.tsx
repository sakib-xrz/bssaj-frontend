"use client";

import React from "react";
import Image from "next/image";
import { useGetAllCommieeQuery } from "@/redux/features/Committee/CommitteeApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { CommitteeMember } from "@/redux/tagTypes";

function Committee() {
  const { isLoading, data } = useGetAllCommieeQuery(
    [
        {name:"limit",value:999}
    ]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading members...</p>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No members found
          </h3>
          <p className="mt-1 text-gray-500">
            There are currently no committee members to display.
          </p>
        </div>
      </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.data.map((profile: CommitteeMember) => (
          <Card
            key={profile.id}
            className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#003366]"
          >
            <CardContent className="flex flex-col items-center text-center p-6">
              {/* Profile Image */}
              <div className="relative h-32 w-32 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={profile.profile_picture || "/placeholder.svg"}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-gray-900">
                {profile.name}
              </h2>

              {/* Designation Badge */}
              <Badge className="mt-2 bg-[#003366] text-white px-3 py-1">
                {formatDesignation(profile.designation)}
              </Badge>

              {/* Term */}
              <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Term: {profile.term_start_year} - {profile.term_end_year}
                </span>
              </div>

              {/* Member since */}
              <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                <span>
                  Member since {new Date(profile.created_at).getFullYear()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Committee;
