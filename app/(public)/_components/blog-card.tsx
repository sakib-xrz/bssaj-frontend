import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blog } from "@/lib/types";
import { format } from "date-fns";
import { ArrowLeft, Calendar, FileText, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogCard({ blog }: { blog: Blog }) {
  const [imageError, setImageError] = useState(false);

  // Safety check - if no blog data, show a placeholder
  if (!blog) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="overflow-hidden border-0 shadow-lg h-full">
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p>No blog data</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <h2 className="text-xl font-bold text-gray-400 mb-3">No Title</h2>
            <p className="text-gray-400 text-sm mb-6">No content available</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-gray-300">
                <AvatarFallback className="text-gray-600 text-xs">
                  NA
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-400 text-sm">No Author</p>
                <p className="text-gray-400 text-xs">No Date</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Helper functions to safely handle missing data
  const getSafeTitle = () => {
    return blog?.title || "Untitled Blog Post";
  };

  const getSafeContent = () => {
    if (!blog?.content) return "No content available for this blog post.";
    const cleanContent = blog.content.replace(/<[^>]+>/g, "");
    return cleanContent.length > 0
      ? cleanContent
      : "No content available for this blog post.";
  };

  const getSafeAuthorName = () => {
    return blog?.author?.name || "Unknown Author";
  };

  const getSafeAuthorInitials = () => {
    const name = getSafeAuthorName();
    if (name === "Unknown Author") return "UA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getSafeDate = () => {
    try {
      if (!blog?.created_at) return "Date not available";
      return format(new Date(blog.created_at), "PPP");
    } catch {
      return "Date not available";
    }
  };

  const getSafeImageSrc = () => {
    // If no cover image or empty string, return null to show placeholder
    if (!blog?.cover_image || blog.cover_image.trim() === "") {
      return null;
    }

    // If the cover image is a valid URL or path, use it
    return blog.cover_image;
  };

  const getSafeImageAlt = () => {
    return blog?.title || "Blog post image";
  };

  // Check if we should show an image or placeholder
  const shouldShowImage = getSafeImageSrc() && !imageError;

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg h-full">
        {/* Blog Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
          {shouldShowImage ? (
            <Image
              src={getSafeImageSrc()!}
              alt={getSafeImageAlt()}
              fill
              className="object-cover"
              priority={false}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <ImageIcon className="h-16 w-16 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No Image Available</p>
              </div>
            </div>
          )}

          {/* Optional Back Button or Tag can go here */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full bg-black/20 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white flex flex-col h-full">
          <Link
            href={blog?.id ? `/blog/${blog.id}` : "#"}
            className="flex-grow"
          >
            <h2 className="text-xl font-bold line-clamp-1 text-gray-900 mb-3 leading-tight hover:text-primary transition-colors">
              {getSafeTitle()}
            </h2>

            <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
              {getSafeContent().slice(0, 150)}
              {getSafeContent().length > 150 && "..."}
            </p>
          </Link>

          {/* Author Section */}
          <div className="flex items-center gap-3 mt-auto">
            <Avatar className="h-8 w-8 bg-gradient-to-br from-primary to-blue-600">
              <AvatarImage
                src={blog?.author?.profile_picture || ""}
                alt={getSafeAuthorName()}
              />
              <AvatarFallback className="text-white text-xs font-semibold">
                {getSafeAuthorInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">
                {getSafeAuthorName()}
              </p>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {getSafeDate()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
