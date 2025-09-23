import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, User } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import ShareButton from "@/app/(public)/_components/ShareButton";

// ====== SERVER SIDE DATA FETCH ======
async function getBlog(id: string) {
  const res = await fetch(`https://api.bssaj.org/api/v1/blogs/${id}`, {
    next: { revalidate: 60 }, // cache for 1 minute (ISR)
  });
  if (!res.ok) throw new Error("Failed to fetch blog");
  const data = await res.json();
  return data.data;
}

// ====== META TAGS (SEO + SOCIAL SHARE) ======
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blog = await getBlog(params.id);

  return {
    title: blog.title,
    description: blog?.excerpt || blog?.content?.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog?.excerpt || blog?.content?.slice(0, 150),
      url: `https://api.bssaj.org/api/v1/blogs/${params.id}`,
      images: [
        {
          url: blog.cover_image || "/placeholder.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog?.excerpt || blog?.content?.slice(0, 150),
      images: [blog.cover_image || "/placeholder.png"],
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
export default async function SingleBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await getBlog(params.id);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {blog.is_published && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Published
              </Badge>
            )}
            {blog.is_approved && (
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
          {blog.title}
        </h1>

        {/* Author and Date Info */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={blog.author?.profile_picture || "/placeholder.svg"}
                alt={blog.author?.name}
              />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(blog.author?.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">
                  {blog.author?.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.created_at)}</span>
                {blog.updated_at !== blog.created_at && (
                  <span className="text-gray-400">
                    • Updated {formatDate(blog.updated_at)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="mb-8">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
            priority
          />
        </div>
      )}

      {/* Content */}
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div
            className="prose text-gray-700 prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>
    </article>
  );
}
