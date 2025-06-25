import React from "react";
import MemberCard from "./_components/member-card";
import Container from "@/components/shared/container";

export const mockMembers = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "ADVISER",
    approved_at: new Date("2023-01-15"),
    created_at: new Date("2023-01-10"),
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 234-5678",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "HONORABLE",
    approved_at: new Date("2023-02-01"),
    created_at: new Date("2023-01-25"),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "EXECUTIVE",
    approved_at: new Date("2023-03-10"),
    created_at: new Date("2023-03-05"),
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 (555) 456-7890",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "ASSOCIATE",
    approved_at: new Date("2023-04-15"),
    created_at: new Date("2023-04-10"),
  },
  {
    id: "5",
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 567-8901",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "STUDENT_REPRESENTATIVE",
    approved_at: new Date("2023-05-20"),
    created_at: new Date("2023-05-15"),
  },
  {
    id: "6",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 678-9012",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "EXECUTIVE",
    approved_at: new Date("2023-06-01"),
    created_at: new Date("2023-05-28"),
  },
  {
    id: "7",
    name: "Ahmed Shujaat Mohib",
    email: "ahmed.mohib@example.com",
    phone: "+1 (555) 789-0123",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "ADVISER",
    approved_at: new Date("2023-07-01"),
    created_at: new Date("2023-06-25"),
  },
  {
    id: "8",
    name: "Lisa Park",
    email: "lisa.park@example.com",
    phone: "+1 (555) 890-1234",
    profile_picture: "/placeholder.svg?height=300&width=300",
    kind: "ASSOCIATE",
    approved_at: new Date("2023-07-15"),
    created_at: new Date("2023-07-10"),
  },
];

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
