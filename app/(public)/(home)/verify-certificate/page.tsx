"use client";

import Container from "@/components/shared/container";
import PDFViewer from "@/components/shared/pdf-viewer";
import QRCodeGenerator from "@/components/shared/qr-code-generator";
import SectionHeader from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FRONTEND_URL } from "@/lib/constant";
import { useVerifyCertificateQuery } from "@/redux/features/certificate/certificateApi";
import {
  Award,
  Calendar,
  Download,
  GraduationCap,
  QrCode,
  User,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VerifyCertificate() {
  const searchParams = useSearchParams();
  const sl = searchParams.get("sl");
  const { data, isLoading, isError } = useVerifyCertificateQuery(sl);

  if (isLoading) {
    return (
      <div>
        <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
          <SectionHeader
            title="Certificate Verification"
            description="Verify your certificate"
          />
        </div>
        <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#E6F0FF] border-t-[#00AEEF] mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-[#003366]" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#003366]">
                Verifying Certificate
              </h3>
              <p className="text-gray-600">
                Please wait while we verify your certificate...
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
          <SectionHeader
            title="Certificate Verification"
            description="Verify your certificate"
          />
        </div>
        <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white w-full max-w-md">
            <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500" />
            <CardContent className="pt-6 text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-red-500 text-2xl">⚠️</div>
                </div>
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-[#003366]">
                  Certificate Not Found
                </h2>
                <p className="text-gray-600">
                  The certificate with code{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    &quot;{sl}&quot;
                  </span>{" "}
                  could not be found in our database.
                </p>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white"
                  asChild
                >
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  const certificate = data?.data;

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="Certificate Verification"
          description="Verify your certificate"
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certificate Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Certificate Info */}
            <Card className="group hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-[#003366] to-[#00AEEF]" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-[#003366]">
                    <GraduationCap className="h-5 w-5" />
                    Certificate Details
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    Verified ✓
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Certificate Numbers */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Certificate Number
                    </label>
                    <p className="font-mono text-sm bg-gray-50 p-3 rounded border mt-1">
                      {certificate.sl_no}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Student ID
                    </label>
                    <p className="font-mono text-sm bg-gray-50 p-3 rounded border mt-1">
                      {certificate.student_id}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#00AEEF]" />
                    <span className="font-semibold text-[#003366]">
                      Personal Information
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <p className="font-mono text-sm bg-gray-50 p-3 rounded border mt-1">
                        {certificate.name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Gender</label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.gender}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Date of Birth
                      </label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {formatDate(certificate.date_of_birth)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Father&apos;s Name
                      </label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.father_name}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Mother&apos;s Name
                      </label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.mother_name}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Academic Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#00AEEF]" />
                    <span className="font-semibold text-[#003366]">
                      Academic Information
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* <div>
                      <label className="text-sm text-gray-600">Institute</label>
                      <p className="font-semibold text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.institute_name}
                      </p>
                    </div> */}
                    <div>
                      <label className="text-sm text-gray-600">Grade</label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.grade}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Completed Hours
                      </label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.completed_hours} hours
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Course Duration
                      </label>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded border mt-1">
                        {certificate.course_duration} months
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Issue Date
                      </label>
                      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-800">
                          {formatDate(certificate.issued_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Issuing Agency */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">
                    Issuing Agency
                  </label>
                  <div className="bg-gradient-to-r from-[#00AEEF]/10 to-[#003366]/10 p-4 rounded border">
                    <p className="font-semibold text-[#003366]">
                      {certificate.agency.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {certificate.agency.contact_email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <Card className="group hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-[#003366] to-[#00AEEF]" />
              <CardHeader>
                <CardTitle className="text-center text-[#003366]">
                  Verification QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <QRCodeGenerator
                  value={`${FRONTEND_URL}/verify-certificate?sl=${certificate.sl_no}`}
                />
                <p className="text-xs text-center text-gray-500">
                  Scan this QR code to verify the certificate
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white"
                  onClick={() => {
                    const canvas = document.querySelector("canvas");
                    if (canvas) {
                      const link = document.createElement("a");
                      link.download = `certificate-${certificate.sl_no.toLowerCase()}.png`;
                      link.href = canvas.toDataURL();
                      link.click();
                    }
                  }}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Download Certificate */}
            <Card className="group hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-[#003366] to-[#00AEEF]" />
              <CardHeader>
                <CardTitle className="text-center text-[#003366]">
                  Download Certificate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-gradient-to-r from-[#00AEEF] to-[#0099CC] hover:from-[#0099CC] hover:to-[#00AEEF] text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() =>
                    window.open(certificate.certificate_url, "_blank")
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="mt-8">
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
            <div className="h-2 bg-gradient-to-r from-[#003366] to-[#00AEEF]" />
            <CardHeader>
              <CardTitle className="text-[#003366]">
                Certificate Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border shadow-inner h-[500px]">
                <PDFViewer pdfUrl={certificate.certificate_url} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
