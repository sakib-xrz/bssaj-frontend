"use client";

import React, { useMemo } from "react";
import MemberCard from "./_components/member-card";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { useGetMembersQuery } from "@/redux/features/member/memberApi";
import { Member } from "./_components/member-card";

export default function Members() {
  const memberKindPriority = {
    ADVISER: 1,
    HONORABLE: 2,
    EXECUTIVE: 3,
    ASSOCIATE: 4,
    STUDENT_REPRESENTATIVE: 5,
  };

  const { data, isLoading, isError, error } = useGetMembersQuery({});
  const fetchedMembers: Member[] = data?.data || [];

  // Sort & filter approved members
  const approvedMembers = useMemo(() => {
    return [...fetchedMembers]
      .filter((member) => member.status === "APPROVED")
      .sort(
        (a, b) =>
          memberKindPriority[a.kind as keyof typeof memberKindPriority] -
          memberKindPriority[b.kind as keyof typeof memberKindPriority]
      );
  }, [fetchedMembers]);

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

  if (!approvedMembers.length) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-gray-600">No approved members found.</p>
      </Container>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          className="mb-20"
          title="Our Executive Members"
          description="Explore our network of member agencies supporting Bangladeshi students in Japan."
        />
      </div>

      <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
        {approvedMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Container>
    </div>
  );
}
