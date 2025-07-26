"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { Calendar, CheckCircle, Facebook, Link2, Linkedin, Share2, Twitter, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

// Utility: format date
const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

// Utility: get initials
const getInitials = (name: string) =>
    name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

// Utility: generate share URL
const getShareUrl = () => typeof window !== "undefined" ? window.location.href : "";

// Share handler
const useShare = () => {
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = async (platform: string) => {
        const url = getShareUrl();
        const encodedUrl = encodeURIComponent(url);

        try {
            switch (platform) {
                case "facebook":
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                        "_blank"
                    );
                    break;
                case "twitter":
                    window.open(
                        `https://twitter.com/intent/tweet?url=${encodedUrl}`,
                        "_blank"
                    );
                    break;
                case "linkedin":
                    window.open(
                        `https://www.linkedin.com/shareArticle?url=${encodedUrl}`,
                        "_blank"
                    );
                    break;
                case "copy":
                    await navigator.clipboard.writeText(url);
                    alert("Link copied to clipboard!");
                    break;
                case "native":
                    if (typeof navigator.share === "function") {
                        await navigator.share({ title: document.title, url });
                    } else {
                        alert("Native sharing is not supported in this browser.");
                    }
                    break;
                default:
                    console.warn(`Unknown platform: ${platform}`);
            }
        } catch (error) {
            console.error("Error sharing:", error);
        } finally {
            setIsSharing(false);
        }
    };

    return { handleShare, isSharing };
};

export default function SingleBlogPage() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleBlogQuery(id);
    const blog = data?.data;
    const { handleShare, isSharing } = useShare();

    if (isLoading) return <p className="text-center py-10">Loading...</p>;
    if (isError || !blog) return <p className="text-center text-red-500 py-10">Something went wrong.</p>;

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        {blog.is_published && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Published
                            </Badge>
                        )}
                        {blog.is_approved && (
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                                Approved
                            </Badge>
                        )}
                    </div>

                    {/* Share Button */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" disabled={isSharing}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleShare("facebook")}>
                                <Facebook className="w-4 h-4 mr-2" />
                                Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare("twitter")}>
                                <Twitter className="w-4 h-4 mr-2" />
                                Twitter
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare("linkedin")}>
                                <Linkedin className="w-4 h-4 mr-2" />
                                LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare("copy")}>
                                <Link2 className="w-4 h-4 mr-2" />
                                Copy Link
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                {/* Author and Date Info */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={blog.author.profile_picture || "/placeholder.svg"}
                                alt={blog.author.name}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                                {getInitials(blog.author.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-900">{blog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(blog.created_at)}</span>
                                {blog.updated_at !== blog.created_at && (
                                    <span className="text-gray-400">• Updated {formatDate(blog.updated_at)}</span>
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
                        className="prose text-gray-700 prose-lg max-w-none "
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </CardContent>
            </Card>

        </article>
    );
}
