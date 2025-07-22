/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Loader2 } from "lucide-react";

import MembershipApplicationForm from "./_components/membership-application-form";
import MemberProfileDisplay from "./_components/member-profile-display";
import MembershipPendingStatus from "./_components/membership-pending-status";

const useGetMyMembershipStatusQuery = () => {
  // 4. Approved member (mock data)
  const [data, setData] = React.useState({
    status: "PENDING",
    memberData: {
      id: "user-member-123",
      name: "Redwan Hasan",
      email: "redwanhasancse@gmail.com",
      phone: "01568283360",
      profile_picture: "",
      kind: "ASSOCIATE" as
        | "ASSOCIATE"
        | "ADVISER"
        | "HONORABLE"
        | "EXECUTIVE"
        | "STUDENT_REPRESENTATIVE",
      member_since: "2023-01-10T00:00:00Z",
      created_at: "2023-01-10T00:00:00Z",
      is_approved: true,
      member_id: "1",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {}, []);

  return { data, isLoading };
};

export default function MyMembershipPage() {
  const { data: membershipStatus, isLoading } = useGetMyMembershipStatusQuery();

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

  return (
    <Container className="py-12 md:py-16 flex justify-center items-center">
      <div className="space-y-6 w-full max-w-3xl">
        {membershipStatus?.status === "APPROVED" &&
        membershipStatus.memberData ? (
          <MemberProfileDisplay member={membershipStatus.memberData} />
        ) : membershipStatus?.status === "PENDING" ? (
          <MembershipPendingStatus />
        ) : (
          <MembershipApplicationForm
            onSuccess={handleApplicationSuccess}
            onCancel={() => console.log("Application cancelled")}
          />
        )}
      </div>
    </Container>
  );
}
