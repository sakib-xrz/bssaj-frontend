"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { Member } from "../../_components/member-card";
import { useGetMemberByIdQuery } from "@/redux/features/member/memberApi";

const memberKindLabels = {
  ADVISER: "Adviser",
  HONORABLE: "Honorable Member",
  EXECUTIVE: "Executive",
  ASSOCIATE: "Associate",
  STUDENT_REPRESENTATIVE: "Student Representative",
};

const memberKindColors = {
  ADVISER: "bg-[#003366] text-white",
  HONORABLE: "bg-[#00AEEF] text-white",
  EXECUTIVE: "bg-[#003366]/80 text-white",
  ASSOCIATE: "bg-[#00AEEF]/80 text-white",
  STUDENT_REPRESENTATIVE: "bg-gray-600 text-white",
};

export default function MemberDetails({ memberId }: { memberId: string }) {
  const { data, isLoading, isError, error } = useGetMemberByIdQuery(memberId);
  const member: Member | undefined = data?.data;

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-lg text-primary">Loading member details...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Failed to fetch member details:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-lg text-red-500">
          Error loading member details. Please try again later.
        </p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-lg text-gray-600">Member not found.</p>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.name} - Member Profile`,
          text: `Check out ${member.name}'s member profile`,
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
    <div className="flex justify-center items-center py-12 md:py-16">
      <div className="max-w-md mx-auto w-full">
        <Card className="overflow-hidden shadow-2xl border-0">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-[#003366] to-[#00AEEF] relative">
            <div className="absolute inset-0 bg-black/10"></div>
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
          </div>

          <CardContent className="relative px-6 pb-6">
            {/* Profile Picture */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={member?.user?.profile_picture || "/placeholder.svg"}
                    alt={member.name}
                  />
                  <AvatarFallback className="bg-[#00AEEF] text-white text-3xl">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {member.approved_at && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Name and Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#003366] mb-2">
                {member.name}
              </h1>
              <Badge
                className={`${
                  memberKindColors[member.kind as keyof typeof memberKindColors]
                } text-sm px-3 py-1`}
              >
                {memberKindLabels[member.kind as keyof typeof memberKindLabels]}
              </Badge>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-[#00AEEF] rounded-full">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium text-[#003366] break-all">
                    {member.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-[#003366] rounded-full">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium text-[#003366]">
                    {member.phone}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Approved</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {new Date(member.approved_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Member ID</span>
                </div>
                <span className="text-sm font-medium text-[#003366] font-mono">
                  #{member.id.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleShare} variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button onClick={generateVCard} className="flex-1">
                <Download className="h-4 w-4" />
                Save Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
