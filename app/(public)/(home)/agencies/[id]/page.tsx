// app/(public)/agencies/[id]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Container from "@/components/shared/container";
import {
  Calendar,
  Facebook,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import ShareButton from "@/app/(public)/_components/ShareButton";

// ====== SERVER SIDE DATA FETCH ======
async function getAgency(id: string) {
  const res = await fetch(`https://api.bssaj.org/api/v1/agencies/${id}`, {
    next: { revalidate: 60 }, // cache for 1 minute (ISR)
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch agency");
  }

  const data = await res.json();
  return data.data;
}

// ====== META TAGS (SEO + SOCIAL SHARE) ======
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const agency = await getAgency(params.id);

  if (!agency) {
    return {
      title: "Agency Not Found",
    };
  }

  return {
    title: `${agency.name} - Agency Profile`,
    openGraph: {
      title: `${agency.name} - Agency Profile`,
      url: `https://yourdomain.com/agencies/${params.id}`,
      siteName: "Your Site Name",
      images: [
        {
          url: agency.cover_photo || agency.logo || "/placeholder-og.jpg",
          width: 1200,
          height: 630,
          alt: `${agency.name} - Agency Profile`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${agency.name} - Agency Profile`,
      images: [agency.cover_photo || agency.logo || "/placeholder-og.jpg"],
      creator: "@yourtwitterhandle",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ====== LOADING COMPONENT ======
function LoadingState() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
      <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-primary font-semibold">
        Loading agency profile...
      </p>
    </Container>
  );
}

// ====== ERROR COMPONENT ======
function ErrorState({ message }: { message: string }) {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
      <p className="text-lg text-red-500">{message}</p>
    </Container>
  );
}

// ====== NOT FOUND COMPONENT ======
function NotFoundState() {
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

// ====== MAIN PAGE COMPONENT ======
export default async function SingleAgencyProfilePage({
  params,
}: {
  params: { id: string };
}) {
  let agency;

  try {
    agency = await getAgency(params.id);
  } catch (error) {
    console.error("Error fetching agency:", error);
    return (
      <ErrorState message="Error loading agency details. Please try again later." />
    );
  }

  if (!agency) {
    return <NotFoundState />;
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

        <Container className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-white">
              <Image
                src={agency.logo || "/placeholder.svg"}
                alt={`${agency.name} logo`}
                width={80}
                height={80}
                className="object-cover bg-white"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{agency.name}</h1>
              <p className="text-blue-200 text-lg">
                {agency.category} • {agency.location}
              </p>
            </div>
          </div>

          {/* Share Button */}
        </Container>
      </div>

      <Container className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                Contact Information
              </CardTitle>
              <ShareButton />
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
                    <div className="text-sm text-gray-600">Director</div>
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
                    <div className="text-sm text-gray-600">Established</div>
                    <div className="font-medium text-gray-800">
                      {agency.established_year}
                    </div>
                  </div>
                </div>
              )}
              {agency.status && (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        agency.status === "APPROVED"
                          ? "bg-green-500"
                          : agency.status === "PENDING"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="font-medium text-gray-800 capitalize">
                      {agency.status.toLowerCase()}
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

          {agency.success_stories && agency.success_stories.length > 0 && (
            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 grid grid-cols-2 md:grid-cols-3 gap-4">
                {agency.success_stories.map(
                  (story: { id: string; image: string }) => (
                    <div
                      key={story.id}
                      className="relative w-full aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={story.image}
                        alt={`Success Story ${story.id}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}
