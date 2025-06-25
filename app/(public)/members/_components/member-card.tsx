import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Crown,
  GraduationCap,
  Mail,
  Phone,
  Star,
} from "lucide-react";

const memberKindIcons = {
  ADVISER: Crown,
  HONORABLE: Award,
  EXECUTIVE: Briefcase,
  ASSOCIATE: Star,
  STUDENT_REPRESENTATIVE: GraduationCap,
};

const memberKindGradients = {
  ADVISER: "from-[#003366] to-[#004080]",
  HONORABLE: "from-[#00AEEF] to-[#0099CC]",
  EXECUTIVE: "from-[#003366]/90 to-[#00AEEF]/90",
  ASSOCIATE: "from-[#00AEEF]/80 to-[#003366]/80",
  STUDENT_REPRESENTATIVE: "from-gray-600 to-gray-700",
};

const memberKindLabels = {
  ADVISER: "Adviser",
  HONORABLE: "Honorable Member",
  EXECUTIVE: "Executive",
  ASSOCIATE: "Associate",
  STUDENT_REPRESENTATIVE: "Student Representative",
};

export default function MemberCard({
  member,
  isCompact = false,
}: {
  member: {
    id: string;
    name: string;
    email: string;
    phone: string;
    profile_picture: string;
    kind: string;
    approved_at: Date;
    created_at: Date;
  };
  isCompact?: boolean;
}) {
  const IconComponent =
    memberKindIcons[member.kind as keyof typeof memberKindIcons];
  return (
    <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
      <div
        className={`h-2 bg-gradient-to-r ${
          memberKindGradients[member.kind as keyof typeof memberKindGradients]
        }`}
      />
      <CardContent className="p-6">
        <div
          className={`flex ${
            isCompact
              ? "items-center gap-4"
              : "flex-col items-center text-center"
          }`}
        >
          {/* Profile Picture */}
          <div className="relative">
            <Avatar
              className={`${
                isCompact ? "h-16 w-16" : "h-24 w-24"
              } ring-4 ring-white shadow-lg group-hover:ring-[#00AEEF]/30 transition-all duration-300`}
            >
              <AvatarImage
                src={member.profile_picture || "/placeholder.svg"}
                alt={member.name}
              />
              <AvatarFallback className="bg-gradient-to-br from-[#00AEEF] to-[#003366] text-white text-xl font-bold">
                {member.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r ${
                memberKindGradients[
                  member.kind as keyof typeof memberKindGradients
                ]
              } rounded-full shadow-lg`}
            >
              <IconComponent className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Member Info */}
          <div className={`${isCompact ? "flex-1" : "mt-4 w-full"}`}>
            <h3
              className={`font-bold text-[#003366] ${
                isCompact ? "text-lg" : "text-xl"
              } mb-2 group-hover:text-[#00AEEF] transition-colors`}
            >
              {member.name}
            </h3>

            <Badge
              className={`bg-gradient-to-r ${
                memberKindGradients[
                  member.kind as keyof typeof memberKindGradients
                ]
              } text-white border-0 shadow-sm mb-3`}
            >
              {memberKindLabels[member.kind as keyof typeof memberKindLabels]}
            </Badge>

            {!isCompact && (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              </div>
            )}

            <div
              className={`flex ${
                isCompact ? "justify-end" : "justify-between"
              } items-center ${isCompact ? "" : "mt-4"}`}
            >
              {!isCompact && (
                <div className="text-xs text-gray-500">
                  Joined {member.created_at.toLocaleDateString()}
                </div>
              )}
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#00AEEF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00AEEF] text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                // onClick={() => window.open(`/member/${member.id}`, "_blank")}
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
