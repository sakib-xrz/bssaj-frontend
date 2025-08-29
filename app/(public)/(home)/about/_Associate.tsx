"use client";

import Container from "@/components/shared/container";
import { MemberType } from "@/lib/types";
import { useGetMembersQuery } from "@/redux/features/member/memberApi";
import React from "react";
import MemberCard from "../members/_components/member-card";
import { Skeleton } from "@/components/ui/skeleton";

function Associate() {
  const { data, isLoading, isError } = useGetMembersQuery([
    { name: "status", value: "APPROVED" },
    { name: "limit", value: 999 },
    { name: "page", value: 1 },
  ]);


  const mainData = data?.data?.filter(
    (item: MemberType) => item.kind === "ASSOCIATE"
  );

 
  if (isLoading) {
    return (
      <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} className="h-60 w-full rounded-lg" />
        ))}
      </Container>
    );
  }


  if (isError || !mainData || mainData.length === 0) {
    return (
      <Container className="py-12 md:py-16 text-center text-gray-500">
        <p className="text-lg md:text-xl">No associates found at the moment.</p>
      </Container>
    );
  }

  // Render actual members
  return (
    <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
      {mainData.map((member: MemberType) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </Container>
  );
}

export default Associate;
