"use client";

import MemberDetails from "@/app/(public)/(home)/members/[id]/_components/member-details";
import Container from "@/components/shared/container";
import { useGetOwnMemberQuery } from "@/redux/features/member/memberApi";

export default function MemberProfileDisplay() {
  const {data,isLoading} = useGetOwnMemberQuery("undifind")
  console.log(data?.data?.id)
  if (isLoading) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16">
        <p className="text-lg text-primary">Loading member details...</p>
      </Container>
    );
  }
  console.log(data.id)

  return (
    <Container>
      <MemberDetails memberId={data?.data?.id} /> 
    </Container>
  );
}
