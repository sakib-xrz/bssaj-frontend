import React from "react";
import MemberCard from "./_components/member-card";
import Container from "@/components/shared/container";
import { mockMembers } from "./_components/mock-data";
import SectionHeader from "@/components/shared/section-header";

export default function Members() {
  const memberKindPriority = {
    ADVISER: 1,
    HONORABLE: 2,
    EXECUTIVE: 3,
    ASSOCIATE: 4,
    STUDENT_REPRESENTATIVE: 5,
  };

  const sortedMembers = mockMembers.sort(
    (a, b) =>
      memberKindPriority[a.kind as keyof typeof memberKindPriority] -
      memberKindPriority[b.kind as keyof typeof memberKindPriority]
  );

  return (
    <div>
      <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-white py-20">
        <SectionHeader
          className="mb-20"
          title="Our Executive Members"
          description="Explore our network of member agencies supporting Bangladeshi students in Japan."
        />
      </div>
      <Container
        className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {sortedMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Container>
    </div>
  );
}
