"use client";

import React, { useEffect, useState } from "react";

import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  Calendar,
  Share2,
  Download,
  QrCode,
  CheckCircle,
  User,
  Award,
  Briefcase,
  Crown,
  GraduationCap,
  Star,
} from "lucide-react";
import Container from "@/components/shared/container";
import { useGetOwnMemberQuery } from "@/redux/features/member/memberApi";
export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_picture: string;
  kind: string;
  approved_at: string;
  created_at: string;
};

const memberKindIcons = {
  ADVISER: Crown,
  HONORABLE: Award,
  EXECUTIVE: Briefcase,
  ASSOCIATE: Star,
  STUDENT_REPRESENTATIVE: GraduationCap,
};

const memberKindColors = {
  ADVISER: "bg-[#003366] text-white",
  HONORABLE: "bg-[#00AEEF] text-white",
  EXECUTIVE: "bg-[#003366]/80 text-white",
  ASSOCIATE: "bg-[#00AEEF]/80 text-white",
  STUDENT_REPRESENTATIVE: "bg-gray-600 text-white",
};

const memberKindLabels = {
  ADVISER: "Adviser",
  HONORABLE: "Honorable Member",
  EXECUTIVE: "Executive",
  ASSOCIATE: "Associate",
  STUDENT_REPRESENTATIVE: "Student Representative",
};

export default function SingleMemberProfilePage() {
  const { data, isLoading, isError, error } = useGetOwnMemberQuery("own");
  const member: Member | undefined = data?.data;

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    document.title = member ? `${member.name}'s Profile` : "Member Profile";
  }, [member]);

  useEffect(() => {
    if (member && currentUrl) {
      const generateQr = async () => {
        try {
          const url = `${currentUrl}`;
          const dataUrl = await QRCode.toDataURL(url, {
            width: 512,
            margin: 2,
            color: {
              dark: "#003366",
              light: "#FFFFFF",
            },
          });
          setQrCodeDataUrl(dataUrl);
        } catch (err) {
          console.error("Error generating QR code:", err);
          setQrCodeDataUrl(null);
        }
      };
      generateQr();
    }
  }, [member, currentUrl]);

  if (isLoading) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin mb-4" />
        <p className="text-lg text-primary font-semibold">
          Loading your profile...
        </p>
      </Container>
    );
  }

  // Handle error state
  if (isError) {
    console.error("Failed to fetch member details:", error);
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <p className="text-lg text-red-500">
          Error loading member details. Please try again later.
        </p>
      </Container>
    );
  }

  // Handle case where member is not found after loading
  if (!member) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Member Not Found
        </h2>
        <p className="text-center text-gray-600">
          Unable to load your profile details. Please ensure you are logged in.
        </p>
      </Container>
    );
  }

  // Get the appropriate icon for the member's kind
  const MemberKindIcon =
    memberKindIcons[member.kind as keyof typeof memberKindIcons];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.name}'s Profile`,
          text: `Check out ${member.name}'s member profile on BSSAJ!`,
          url: currentUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      const el = document.createElement("textarea");
      el.value = currentUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("Link copied to clipboard!");
    }
  };

  const generateVCard = () => {
    const nameParts = member.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${member.name}`,
      `N:${lastName};${firstName};;;`,
      `EMAIL:${member.email}`,
      `TEL:${member.phone}`,
      `TITLE:${memberKindLabels[member.kind as keyof typeof memberKindLabels]}`,
      `ORG:BSSAJ`,
      `URL:${currentUrl}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${member.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleQRCodeDownload = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement("a");
      link.href = qrCodeDataUrl;
      link.download = `${member.name.replace(/\s+/g, "_")}_profile_qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("QR code not available yet. Please try again.");
    }
  };

  return (
    <div>
      <Container className="py-12 md:py-16 flex justify-center items-center">
        <Card className="w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden">
          {/* Header Section of the Card */}
          <div className="relative h-48 bg-gradient-to-r from-[#003366] to-[#00AEEF] flex items-end justify-center pb-6">
            <div className="absolute top-4 right-4">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                onClick={handleQRCodeDownload}
                disabled={!qrCodeDataUrl}
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
            {/* Profile Picture and Kind Icon */}
            <div className="relative -mb-16">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={member.profile_picture || "/placeholder.svg"}
                  alt={member.name}
                />
                <AvatarFallback className="bg-[#00AEEF] text-white text-3xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 p-3 rounded-full shadow-lg ${
                  memberKindColors[member.kind as keyof typeof memberKindColors]
                }`}
              >
                <MemberKindIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <CardContent className="p-6 pt-20 text-center">
            {" "}
            {/* Adjusted padding-top to account for avatar overlap */}
            {/* Name and Badge */}
            <h1 className="text-2xl font-bold text-[#003366] mb-2">
              {member.name}
            </h1>
            <Badge
              className={`${
                memberKindColors[member.kind as keyof typeof memberKindColors]
              } text-sm px-3 py-1 mb-6`}
            >
              {memberKindLabels[member.kind as keyof typeof memberKindLabels]}
            </Badge>
            {/* Contact Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="p-2 bg-[#00AEEF] rounded-full">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium text-[#003366] break-all">
                      {member.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="p-2 bg-[#003366] rounded-full">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-medium text-[#003366]">
                      {member.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            {/* Additional Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left">
                Membership Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Member Since</span>
                  </div>
                  <span className="text-sm font-medium text-[#003366]">
                    {new Date(member.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {member.approved_at && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Approved</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {new Date(member.approved_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Member ID</span>
                  </div>
                  <span className="text-sm font-medium text-[#003366] font-mono">
                    {member.id}
                  </span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <Share2 className="h-4 w-4 mr-2" /> Share Profile
              </Button>
              <Button
                onClick={generateVCard}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Download className="h-4 w-4 mr-2" /> Save Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
