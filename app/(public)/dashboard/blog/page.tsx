/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DashboardLoading from "@/app/(public)/_components/dashboard-loading";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Blog } from "@/lib/types";
import { useAuthUser } from "@/redux/features/auth/authSlice";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/features/blog/blogApi";
import { CheckCircleIcon, PlusIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const Blogs = () => {
  const [activeTab, setActiveTab] = useState<"Approved" | "Pending">(
    "Approved"
  );

  const user = useAuthUser();

  const { data, isLoading, isError, error, refetch } = useGetAllBlogsQuery([
    {
      name: "is_approved",
      value: true,
    },
  ]);

  const blogs = data?.data || [];
  const [deleteBlog] = useDeleteBlogMutation();

  // delete
  const handleDelete = async (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await deleteBlog({ id: blogId });
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          refetch();
        } else {
          const errorMessage =
            (res as any)?.error?.data?.message || "Something went wrong";
          toast.error(errorMessage);
        }
      } catch (err) {
        console.error("Failed to delete blog:", err);
        toast.error("Failed to delete blog.");
      }
    }
  };

  if (isLoading) {
    return (
      <Container>
        <DashboardLoading message="Loading blogs..." />
      </Container>
    );
  }

  if (isError) {
    console.error("Error fetching blogs:", error);
    return (
      <Container className="py-12 md:py-16 text-center text-red-500">
        <p>Error loading blogs. Please try again later.</p>
      </Container>
    );
  }

  // filter
  const filteredBlogs = blogs.filter(
    (blog: Blog) =>
      blog.author?.id === user?.id &&
      (activeTab === "Approved" ? blog.is_approved : !blog.is_approved)
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

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog: Blog) => (
                <Card
                  key={blog.id}
                  className="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={blog.cover_image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-t-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div
                      className={`absolute top-3 right-3 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                        blog.is_approved ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {blog.is_approved ? (
                        <CheckCircleIcon className="h-3 w-3" />
                      ) : (
                        <XCircleIcon className="h-3 w-3" />
                      )}
                      {blog.is_approved ? "Approved" : "Pending"}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {blog.content.replace(/<[^>]*>/g, "").substring(0, 100)}
                      ...
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
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                {activeTab === "Approved"
                  ? "No approved blogs found."
                  : "No pending blogs found."}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default Blogs;
