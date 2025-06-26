// Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Award,
  Briefcase,
  Crown,
  GraduationCap,
  Mail,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";

// Constants
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

// Member type
export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  kind: string;
  approved_at: Date;
  created_at: Date;
};
const members: Member[] = [
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

export default function OurMembers() {
  return (
    <Container className="flex flex-col items-center w-full mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Members
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Partnering with leading organizations to support Bangladeshi students
          in Japan.
        </p>
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {members.map((member) => {
            const Icon =
              memberKindIcons[member.kind as keyof typeof memberKindIcons];

            return (
              <CarouselItem
                key={member.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4"
              >
                <Card className="group rounded-2xl overflow-hidden bg-white border transition-all duration-300">
                  <div
                    className={`h-2 bg-gradient-to-r ${
                      memberKindGradients[
                        member.kind as keyof typeof memberKindGradients
                      ]
                    }`}
                  />
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
                            .map((n) => n[0])
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
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-[#003366] mb-2 group-hover:text-[#00AEEF] transition-colors">
                      {member.name}
                    </h3>

                    <Badge
                      className={`text-xs bg-gradient-to-r ${
                        memberKindGradients[
                          member.kind as keyof typeof memberKindGradients
                        ]
                      } text-white border-0 px-3 py-1 mb-3`}
                    >
                      {
                        memberKindLabels[
                          member.kind as keyof typeof memberKindLabels
                        ]
                      }
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
                      <div>Joined {member.created_at.toLocaleDateString()}</div>
                      <Button
                        size="sm"
                        className="text-white px-3 py-1 text-sm bg-gradient-to-r from-[#00AEEF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00AEEF] transition"
                        asChild
                      >
                        <Link href={`/members/${member.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
        <CarouselNext className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
      </Carousel>
    </Container>
  );
}
