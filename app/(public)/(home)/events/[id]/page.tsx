import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "@/app/(public)/_components/ShareButton";
import { Calendar, CheckCircle, User } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// ====== SERVER SIDE DATA FETCH ======
async function getEvent(id: string) {
  const res = await fetch(`https://api.bssaj.org/api/v1/events/${id}`, {
    next: { revalidate: 60 }, // cache for 1 minute (ISR)
  });
  if (!res.ok) throw new Error("Failed to fetch event");
  const data = await res.json();
  return data.data;
}

// ====== META TAGS (SEO + SOCIAL SHARE) ======
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const event = await getEvent(params.id);

  // Create plain text description from HTML content
  const plainDescription = event?.description?.replace(/<[^>]*>/g, "") || "";


  return {
    title: event.title,
    openGraph: {
      title: event.title,
      url: `https://bssaj.org/events/${params.id}`,
      images: [
        {
          url: event.cover_image || "/placeholder.png",
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      images: [event.cover_image || "/placeholder.png"],
    },
  };
}

// ====== HELPERS ======
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

// ====== PAGE ======
export default async function SingleEventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);

  return (
    <div className="bg-gradient-to-b min-h-screen from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/events">
            <Button variant="ghost" className="text-gray-900 hover:bg-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {event.is_published && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Published
                  </Badge>
                )}
                {event.is_approved && (
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200"
                  >
                    Approved
                  </Badge>
                )}
              </div>
              <ShareButton />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Event Date and Organizer Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={event.organizer?.profile_picture || "/placeholder.svg"}
                    alt={event.organizer?.name || "Event Organizer"}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {getInitials(event.organizer?.name || "EO")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {event.organizer?.name || "Event Organizer"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Event Date: {formatDate(event.event_date)}</span>
                    {event.updated_at !== event.created_at && (
                      <span className="text-gray-400">
                        • Updated {formatDate(event.updated_at)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {event.cover_image && (
            <div className="mb-8">
              <Image
                src={event.cover_image}
                alt={event.title}
                width={1200}
                height={600}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          )}

          {/* Event Details */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div
                className="prose text-gray-700 prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </CardContent>
          </Card>

          {/* Additional Event Information */}
          {(event.location || event.event_time) && (
            <Card className="mt-8 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {event.location && (
                    <div>
                      <span className="font-medium">Location: </span>
                      <span className="text-gray-600">{event.location}</span>
                    </div>
                  )}
                  {event.event_time && (
                    <div>
                      <span className="font-medium">Time: </span>
                      <span className="text-gray-600">{event.event_time}</span>
                    </div>
                  )}
                  {event.event_date && (
                    <div>
                      <span className="font-medium">Date: </span>
                      <span className="text-gray-600">
                        {formatDate(event.event_date)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </article>
      </div>
    </div>
  );
}
