"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Crown,
  GraduationCap,
  Mail,
  Phone,
  Star,
  CheckCircle,
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

// Member interface from your OurMembers component
interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_picture?: string;
  kind: keyof typeof memberKindIcons;
  created_at: string;

  is_approved?: boolean;
  member_id?: string;
}

interface MemberProfileDisplayProps {
  member: Member;
}

const MemberProfileDisplay: React.FC<MemberProfileDisplayProps> = ({
  member,
}) => {
  const Icon = memberKindIcons[member.kind];
  const gradient = memberKindGradients[member.kind];
  const label = memberKindLabels[member.kind];

  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-white border transition-all duration-300 shadow-lg">
      {/* Top gradient bar from OurMembers card */}
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Avatar className="h-24 w-24 ring-4 ring-white shadow-md group-hover:ring-[#00AEEF]/40 transition-all duration-300">
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
            className={`absolute -bottom-1 -right-1 p-1.5 bg-gradient-to-r ${gradient} rounded-full shadow-lg`}
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>

        <h3 className="font-semibold text-lg text-[#003366] mb-2 group-hover:text-[#00AEEF] transition-colors">
          {member.name}
        </h3>

        <Badge
          className={`text-xs bg-gradient-to-r ${gradient} text-white border-0 px-3 py-1 mb-3`}
        >
          {label}
        </Badge>

        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{member.phone}</span>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mt-2 text-xs text-gray-500">
          <div>Joined {new Date(member.created_at).toLocaleDateString()}</div>
        </div>

        {member.is_approved !== undefined && (
          <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium">
            <CheckCircle
              className={`h-5 w-5 ${member.is_approved ? "text-green-500" : "text-yellow-500"}`}
            />
            <span
              className={
                member.is_approved ? "text-green-700" : "text-yellow-700"
              }
            >
              Status: {member.is_approved ? "Approved" : "Pending"}
            </span>
          </div>
        )}
        {member.member_id && (
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
            <span className="font-semibold">Member ID:</span>
            <span>#{member.member_id}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberProfileDisplay;
