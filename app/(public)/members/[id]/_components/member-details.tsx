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
import { Member } from "../../_components/member-card";
import QRCode from "qrcode";

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

export default function MemberDetails({ member }: { member: Member }) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

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
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    }
  };

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
    VERSION:3.0
    FN:${member.name}
    EMAIL:${member.email}
    TEL:${member.phone}
    TITLE:${memberKindLabels[member.kind as keyof typeof memberKindLabels]}
    END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${member.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleQRCodeDownload = async () => {
    try {
      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(currentUrl, {
        width: 512,
        margin: 2,
        color: {
          dark: "#003366", // QR code color
          light: "#FFFFFF", // Background color
        },
      });

      // Create download link
      const link = document.createElement("a");
      link.href = qrCodeDataUrl;
      link.download = `${member.name.replace(/\s+/g, "_")}_profile_qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code");
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        {/* Main Profile Card */}
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
                    src={member.profile_picture || "/placeholder.svg"}
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
                  <div className="font-medium text-[#003366]">
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

            {/* Member Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Member Since</span>
                </div>
                <span className="text-sm font-medium text-[#003366]">
                  {member.created_at.toLocaleDateString("en-US", {
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
                    {member.approved_at.toLocaleDateString("en-US", {
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
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleShare}
                className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={generateVCard}
                variant="outline"
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Save Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
