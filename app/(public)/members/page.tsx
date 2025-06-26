import React from "react";
import MemberCard from "./_components/member-card";
import Container from "@/components/shared/container";
import { mockMembers } from "./_components/mock-data";

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
    <Container
      className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
    >
      {sortedMembers.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </Container>
  );
}
