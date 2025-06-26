import Container from "@/components/shared/container";
import { mockMembers } from "../_components/mock-data";
import { Member } from "../_components/member-card";
import dynamic from "next/dynamic";

const MemberDetails = dynamic(() => import("./_components/member-details"), {
  ssr: false,
});

export default function MemberPage({ params }: { params: { id: string } }) {
  const member = mockMembers.find((m) => m.id === params.id);

  return (
    <Container>
      <MemberDetails member={member as Member} />
    </Container>
  );
}
