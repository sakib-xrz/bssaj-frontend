"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import Container from "@/components/shared/container";
import {
  Calendar,
  Facebook,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { useGetAgencyByIdQuery } from "@/redux/features/agency/agencyApi";

import deafultImage from "@/lib/image/deafultImage.jpg";

export type Agency = {
  id: string;
  name: string;
  logo: string | null;
  cover_photo: string | null; // Added cover_photo field
  category: string;
  location: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  website: string | null;
  director_name: string | null;
  established_year: number | null;
  address: string | null;
  facebook_url: string | null;
  success_stories?: Array<{
    id: string;
    agency_id: string;
    image: string;
  }>;
  successStoryImages?: string[];
  status: "Approved" | "Pending";

  profileLink?: string;
  websiteLink?: string;
};

export default function SingleAgencyProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const agencyId = params.id;

  const {
    data: agencyData,
    isLoading,
    isError,
    error,
  } = useGetAgencyByIdQuery(agencyId);

  const agency: Agency | undefined = agencyData?.data;

  useEffect(() => {
    if (agency) {
      document.title = `${agency.name}'s Profile`;
      console.log("Agency data:", agency);
      console.log("Success stories (success_stories):", agency.success_stories);
      console.log(
        "Success stories (successStoryImages):",
        agency.successStoryImages
      );
    } else {
      document.title = "Agency Profile";
    }
  }, [agency]);

  if (isLoading) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <Loader2 className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin mb-4" />
        <p className="text-lg text-primary font-semibold">
          Loading agency profile...
        </p>
      </Container>
    );
  }

  if (isError) {
    console.error("Failed to fetch agency details:", error);
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <p className="text-lg text-red-500">
          Error loading agency details. Please try again later.
        </p>
      </Container>
    );
  }

  if (!agency) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Agency Not Found
        </h2>
        <p className="text-center text-gray-600">
          The agency profile you are looking for does not exist.
        </p>
      </Container>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Dynamic Header Section with Cover Photo */}
      <div
        className={`relative py-8 px-4 md:px-8 text-white ${
          agency.cover_photo ? "" : "bg-blue-900"
        }`}
        style={
          agency.cover_photo
            ? {
                backgroundImage: `url(${agency.cover_photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {/* Semi-transparent overlay to ensure text readability */}
        {agency.cover_photo && (
          <div className="absolute inset-0 bg-blue-900/70"></div>
        )}
        <Container className="flex items-center relative z-10">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <Image
              src={agency.logo || deafultImage}
              alt={`${agency.name} logo`}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{agency.name}</h1>
            <p className="text-blue-200 text-lg">
              {agency.category} • {agency.location}
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-gray-600">Call Us</div>
                  <div className="font-medium text-gray-800">
                    {agency.contact_phone || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-gray-600">Email Us</div>
                  <div className="font-medium text-gray-800 break-all">
                    {agency.contact_email}
                  </div>
                </div>
              </div>
              {agency.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600">Website</div>
                    <Link
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      {agency.website}
                    </Link>
                  </div>
                </div>
              )}
              {agency.facebook_url && (
                <div className="flex items-center gap-3">
                  <Facebook className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600">Facebook</div>
                    <Link
                      href={agency.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline break-all"
                    >
                      Visit Page
                    </Link>
                  </div>
                </div>
              )}
              {agency.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600">Address</div>
                    <div className="font-medium text-gray-800">
                      {agency.address}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Agency Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {agency.director_name && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600">Founder</div>
                    <div className="font-medium text-gray-800">
                      {agency.director_name}
                    </div>
                  </div>
                </div>
              )}
              {agency.established_year && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-gray-600">Founded</div>
                    <div className="font-medium text-gray-800">
                      {agency.established_year}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                About {agency.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-700 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: agency.description || "No description available.",
                }}
                className="prose prose-gray max-w-none"
              />
            </CardContent>
          </Card>

          {(() => {
            const successStories =
              agency.success_stories || agency.successStoryImages || [];
            const hasSuccessStories = successStories.length > 0;

            if (!hasSuccessStories) return null;

            return (
              <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Success Stories
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {successStories.map((story, index) => {
                    const imgSrc =
                      typeof story === "string" ? story : story.image;
                    const key = typeof story === "string" ? index : story.id;

                    return (
                      <div
                        key={key}
                        className="relative w-full aspect-video rounded-lg overflow-hidden"
                      >
                        <Image
                          src={imgSrc}
                          alt={`Success Story ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })()}
        </div>
      </Container>
    </div>
  );
}
