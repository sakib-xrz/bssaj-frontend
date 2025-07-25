"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import Container from "@/components/shared/container";
import { useGetMyInfoQuery } from "@/redux/features/get-me/get_me";
import { Loader2 } from "lucide-react";
import MemberProfileDisplay from "./_components/member-profile-display";
import MembershipApplicationForm from "./_components/membership-application-form";
import MembershipPendingStatus from "./_components/membership-pending-status";

export default function MyMembershipPage() {
  const { data: user, isLoading } = useGetMyInfoQuery();
  const handleApplicationSuccess = () => {
    console.log("Application submitted, status should now be pending.");
  };

  if (isLoading) {
    return (
      <Container className="py-12 md:py-16 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-4 text-lg text-gray-700">
          Loading membership status...
        </p>
      </Container>
    );
  }
  console.log(user)
  let content = null;

  if (!user?.is_member && !user?.has_pending_member_request) {
    content = <MembershipApplicationForm onSuccess={handleApplicationSuccess} />;;
  } else if (!user?.is_member && user?.has_pending_member_request) {
    content = <MembershipPendingStatus />;
  } else if (user?.is_member) {
    content = <MemberProfileDisplay />;
  }

  return (
    <Container className="py-12 md:py-16 flex justify-center items-center">
      {content}
    </Container>
  );
}
