import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blog } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Blog Cover Image */}
        <div className="relative h-48">
          <Image
            src={blog?.cover_image || "/placeholder.svg"}
            alt={blog?.title}
            fill
            className="object-cover"
          />

          {/* Optional Back Button or Tag can go here */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white">
          <Link href={`/blog/${blog?.id}`}><h2 className="text-xl font-bold line-clamp-1 text-gray-900 mb-3 leading-tight">
            {blog.title}
          </h2></Link>

          <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
            {blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...
          </p>

          {/* Author Section */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={blog.author?.profile_picture || "/placeholder.svg"}
                alt={blog.author?.name || "Author"}
              />
              <AvatarFallback>
                {blog.author?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {blog.author?.name}
              </p>
              <p className="text-gray-500 text-xs">
                {format(new Date(blog.created_at), "PPP")}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
