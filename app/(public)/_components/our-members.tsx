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
export const mockMembers: Member[] = [
  {
    id: "1",
    name: "NAGAMATSU FARUK",
    email: "rijikint@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988619/NAGAMATSU_FARUK_umhzvt.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000001"
  },
  {
    id: "2",
    name: "Khan Md Mafiz uddin",
    email: "khanjpn@yahoo.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988632/Md_Mafiz_uddin_khan_tmstbo.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000002"
  },
  {
    id: "3",
    name: "Rafin Nurul islam",
    email: "nurul2014jp@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988631/Nurul_Islam_Rafin_cqb2po.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000003"
  },
  {
    id: "4",
    name: "ISLAM MD NAZRUL",
    email: "jbba.bd1@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988631/Md_Nazrul_Islam_Rajib_stlqpd.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000004"
  },
  {
    id: "5",
    name: "HOSSAIN MD SHAHADAT",
    email: "mjls.info1@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988627/SHAHADAT_SWAPAN_osdbk2.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000005"
  },
  {
    id: "6",
    name: "UDDIN MD NAZIM",
    email: "nushourav4@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750990349/tMD_NAZIM_UDDIN_cnjf1h.png",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000006"
  },
  {
    id: "7",
    name: "SAKIB MD NAZMUS",
    email: "zenjapanesecn@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988622/Nasmus_Sakib_jce4f4.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000007"
  },
  {
    id: "8",
    name: "Islam Md Kamrul",
    email: "jadidkamrul19@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988619/Kamrul_Islam.png_zlmiwy.png",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000008"
  },
  {
    id: "9",
    name: "HOSSAN MD ERFAN",
    email: "erfanhnn@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988629/Erfan_Hossan_maw0ee.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000009"
  },
  {
    id: "10",
    name: "ISLAM M M TARIQUL",
    email: "anshinjapan2023@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988624/Tarequl_Islam_fkt3p7.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000010"
  },
  {
    id: "11",
    name: "RAHMAN MD MOTIUR",
    email: "md.motiur6@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988628/MD_._MOTIUR_RAHMAN_v96nvf.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000011"
  },
  {
    id: "12",
    name: "HOSSAIN MD ARAFAT",
    email: "arafathossain.self@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988623/MD_ARAFAT_HOSSAIN_rnkczd.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000012"
  },
  {
    id: "13",
    name: "Islam Md Sirajul",
    email: "office@kjlcenter.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988624/Md._Sirajul_Islam_azlcao.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000013"
  },
  {
    id: "14",
    name: "RAHMAN MD MAHFUZUR",
    email: "sohelmahfuz86@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988622/Mahfuzur_Rahman_Sohel_gdqyjv.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000014"
  },
  {
    id: "15",
    name: "Chowdhury Mohammad Raju",
    email: "nipponraju2017@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988626/Mohammad_Raju_Chowdhury_itga5d.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000015"
  },
  {
    id: "16",
    name: "JOY SHAHRIAR HOSSAIN",
    email: "Joyshahriarhossain@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988626/Shariar_joy_gukgeg.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000016"
  },
  {
    id: "17",
    name: "SIKDER MAMUN",
    email: "rahulvip2050@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988623/Mamun_Sikder_mncmvm.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000017"
  },
  {
    id: "18",
    name: "MIA MD SOHEL",
    email: "mdsohelmia814@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988626/MD_SOHEL_MIA_ijzkkj.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000018"
  },
  {
    id: "19",
    name: "Razzak Md Abdur",
    email: "abdurrazzakrussel2003@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750989365/Abdur_Razzak_t8azxc_c_crop_ar_3_4_ztnwnr.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000019"
  },
  {
    id: "20",
    name: "Paul Rajib",
    email: "Anshin2025@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988630/Rajib_Paul_fatntl.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000020"
  },
  {
    id: "21",
    name: "HOSSEN SAIDUL",
    email: "hossensaidul1087@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988629/SAIDUL_ISLAM_vfjq6g.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000021"
  },
  {
    id: "22",
    name: "SHAMEEM HASAN",
    email: "shameemhasan96@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988621/HASAN_SHAMEEM_wx0ylv.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000022"
  },
  {
    id: "23",
    name: "HOSSAIN MOHAMMOD",
    email: "jpbdfoundation@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750989366/Mohammod_Hossain_tpie0h.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000023"
  },
  {
    id: "24",
    name: "ABEDIN JOYNAL",
    email: "joynalabedin524412@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750989962/Joynal_Abedin_r6wr9o.png",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000024"
  },
  {
    id: "25",
    name: "Rana Md Masud",
    email: "japanimasud06@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988620/Masud_Rana_wejh7g.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000025"
  },
  {
    id: "26",
    name: "Shafiqul Islam Md",
    email: "dna.shafi2006@gmail.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988619/Md_shafiqul_Islam_vzb9gk.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000026"
  },
  {
    id: "27",
    name: "Rahman Mohammad Mahmudur",
    email: "info@nexusgroupedu.com",
    profile_picture: "https://res.cloudinary.com/dqm3cealx/image/upload/v1750988619/Rahman_Mohammad_Mahmudur_v5itxn.jpg",
    kind: "EXECUTIVE",
    approved_at: new Date("2025-04-26"),
    created_at: new Date("2025-04-26"),
    phone: "+8801000000027"
  }
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
          {mockMembers?.map((member) => {
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
