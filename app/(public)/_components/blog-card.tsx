import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blog } from "@/lib/types";
import { format } from "date-fns";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: Blog }) {
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
    return blog?.cover_image || "/images/blog-1.png";
  };

  const getSafeImageAlt = () => {
    return blog?.title || "Blog post image";
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg h-full">
        {/* Blog Cover Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={getSafeImageSrc()}
            alt={getSafeImageAlt()}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/blog-1.png";
              target.onerror = null;
            }}
          />

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
          <Link href={`/blog/${blog?.id}`} className="flex-grow">
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
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
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
