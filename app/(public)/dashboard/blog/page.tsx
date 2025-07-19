"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircleIcon, PlusIcon } from "lucide-react";
import Container from "@/components/shared/container";

interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  bannerImage: string;
  status: "Approved" | "Pending";
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Scholarships & Financial Aid for Bangladeshi Students in Japan",
    shortDescription:
      "Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.....",
    bannerImage: "/images/blog-1.png",
    status: "Approved",
  },
  {
    id: "2",
    title: "Scholarships & Financial Aid for Bangladeshi Students in Japan",
    shortDescription:
      "Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.....",
    bannerImage: "/images/blog-2.png",
    status: "Approved",
  },
  {
    id: "3",
    title: "Visa Renewal & Part-Time Work Rules Every Student Should Know",
    shortDescription:
      "Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.....",
    bannerImage: "/images/blog-3.png",
    status: "Approved",
  },
  {
    id: "4",
    title: "Upcoming Events for Bangladeshi Students",
    shortDescription:
      "Details about our next community gathering and cultural exchange program.",
    bannerImage: "/images/blog-1.png",
    status: "Pending",
  },
  {
    id: "5",
    title: "Tips for Learning Japanese Quickly",
    shortDescription:
      "Effective strategies to master the Japanese language for academic success.",
    bannerImage: "/images/blog-2.png",
    status: "Approved",
  },
];

const Blogs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Approved" | "Pending">(
    "Approved"
  );

  const filteredBlogs = mockBlogPosts.filter(
    (blog) => blog.status === activeTab
  );

  return (
    <Container className="py-12 md:py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Manage Blogs
        </h1>
        <Link href="/dashboard/blog/create-blog">
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Create blog
          </Button>
        </Link>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "Approved" | "Pending")}
        className="w-full"
      >
        <TabsList className="mb-6 bg-gray-100 rounded-lg p-1">
          <TabsTrigger
            value="Approved"
            className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="Pending"
            className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Approved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={blog.bannerImage}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3" />
                      {blog.status}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {blog.shortDescription}
                    </CardDescription>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      >
                        <Link href={`/dashboard/blog/edit/${blog.id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                No approved blogs found.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="Pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={blog.bannerImage}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3" /> {blog.status}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {blog.shortDescription}
                    </CardDescription>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      >
                        <Link href={`/dashboard/blogs/edit/${blog.id}`}>
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                No pending blogs found.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Blogs;
