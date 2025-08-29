"use client";

import React from "react";
import Container from "@/components/shared/container";
import MemberCard from "../members/_components/member-card";
import { MemberType } from "@/lib/types";
import { useGetMembersQuery } from "@/redux/features/member/memberApi";
import { Skeleton } from "@/components/ui/skeleton";

function Student_Representative() {
  const { data, isLoading, isError } = useGetMembersQuery([
    { name: "status", value: "APPROVED" },
    { name: "limit", value: 999 },
    { name: "page", value: 1 },
  ]);

  // Filter student representatives
  const mainData: MemberType[] =
    data?.data?.filter(
      (item: MemberType) => item.kind === "STUDENT_REPRESENTATIVE"
    ) || [];

  // Loading state with skeletons
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

  // No data / error state
  if (isError || mainData.length === 0) {
    return (
      <Container className="py-12 md:py-16 text-center text-gray-500">
        <p className="text-lg md:text-xl">
          No student representatives found at the moment.
        </p>
      </Container>
    );
  }

  // Render members
  return (
    <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
      {mainData.map((member: MemberType) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </Container>
  );
}

export default Student_Representative;
