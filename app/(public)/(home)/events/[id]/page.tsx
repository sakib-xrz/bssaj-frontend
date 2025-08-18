/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Error from "@/app/(public)/_components/error";
import Loading from "@/app/(public)/_components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetSinglEventQuery } from "@/redux/features/event/eventApi";
import {
  ArrowLeft,
  Calendar,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Share2,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { toast } from "sonner";

export default function Component() {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetSinglEventQuery(id);
  const [shareUrl, setShareUrl] = useState("");
  const [fullShareUrl, setFullShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      setShareUrl(currentUrl);
      setFullShareUrl(`https://bssaj.org${window.location.pathname}`);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullShareUrl);
    toast.success("Link copied to clipboard!");
  };

  if (isLoading) return <Loading />;

  if (!isLoading && isError) {
    return (
      <Error error="This might be a temporary issue. You can try refreshing the page or come back later." />
    );
  }

  if (!isLoading && !isError && data?.data?.statusCode === 200) {
    return <Error error="No Data Found" />;
  }

  const mainData = data?.data;

  // Keep original HTML for frontend
  const descriptionHtml = mainData?.description || "";

  // Plain text for SEO/share
  const plainDescription = descriptionHtml.replace(/<[^>]*>/g, "");
  const truncatedDescription = plainDescription.substring(0, 160);

  return (
    <div className="bg-gradient-to-b min-h-screen from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/events">
          <Button variant="ghost" className="text-white hover:bg-blue-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          {/* Publish date + share menu */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex text-blue-500 gap-2 items-center">
              <Calendar className="w-4 h-4" />
              Publish Date:{" "}
              {new Date(mainData?.created_at ?? "").toLocaleDateString()}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2 space-y-2">
                <FacebookShareButton
                  url={fullShareUrl}
                  hashtag="#BSSAEvent"
                  className="flex items-center w-full hover:text-blue-600 p-2"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Share on Facebook
                </FacebookShareButton>

                <LinkedinShareButton
                  url={fullShareUrl}
                  title={mainData?.title}
                  summary={truncatedDescription}
                  className="flex items-center w-full hover:text-blue-600 p-2"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Share on LinkedIn
                </LinkedinShareButton>

                <TwitterShareButton
                  url={fullShareUrl}
                  title={mainData?.title}
                  hashtags={["BSSAEvent"]}
                  className="flex items-center w-full hover:text-blue-600 p-2"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Share on Twitter
                </TwitterShareButton>

                <button
                  onClick={copyToClipboard}
                  className="flex items-center w-full hover:text-blue-600 p-2"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Copy Link
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Event title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {mainData?.title}
          </h1>

          {/* Event date */}
          <div className="flex gap-2 py-4 text-gray-600 items-center">
            <Calendar className="w-4 h-4" />
            Event Date:{" "}
            {new Date(mainData?.event_date ?? "").toLocaleDateString()}
          </div>

          {/* Cover image */}
          <Image
            src={mainData.cover_image}
            width={1000}
            height={400}
            className="rounded-2xl"
            alt="event-image"
          />

          {/* Description (with HTML preserved) */}
          <Card className="border-0 shadow-none my-5">
            <CardContent className="p-0">
              <div
                className="prose text-gray-700 prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
