"use client";

import React from "react";
import Container from "@/components/shared/container";

import dynamic from "next/dynamic";

import { useGetMemberByIdQuery } from "@/redux/features/member/memberApi";
import { Member } from "../_components/member-card";
const MemberDetails = dynamic(() => import("./_components/member-details"), {
  ssr: false,
});

export default function MemberPage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError, error } = useGetMemberByIdQuery(params.id);

  const member: Member | undefined = data?.data;

  if (isLoading) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16">
        <p className="text-lg text-primary">Loading member details...</p>
      </Container>
    );
  }

  if (isError) {
    console.error("Failed to fetch member details:", error);
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16">
        <p className="text-lg text-red-500">
          Error loading member details. Please try again later.
        </p>
      </Container>
    );
  }

  if (!member) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16">
        <p className="text-lg text-gray-600">Member not found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <MemberDetails memberId={member.id} />
    </Container>
  );
}
