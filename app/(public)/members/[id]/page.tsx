import Container from "@/components/shared/container";
import { mockMembers } from "../page";
import MemberDetails from "./_components/member-details";
import { Member } from "../_components/member-card";

export default function MemberPage({ params }: { params: { id: string } }) {
  const member = mockMembers.find((m) => m.id === params.id);

  return (
    <Container>
      <MemberDetails member={member as Member} />
    </Container>
  );
}
