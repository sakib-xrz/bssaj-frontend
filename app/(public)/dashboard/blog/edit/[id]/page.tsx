"use client";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import DashboardLoading from "@/app/(public)/_components/dashboard-loading";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogForm } from "../../_components/blog-form";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const { data: blogData, isLoading } = useGetSingleBlogQuery(blogId);
  const blog = blogData?.data;

  const handleSuccess = () => {
    router.push("/dashboard/blog");
  };

  const handleCancel = () => {
    router.push("/dashboard/blog");
  };

  if (isLoading) {
    return (
      <Container>
        <div className="space-y-6">
          <div className="flex flex-col sm:justify-between sm:items-center gap-4">
            <Link href="/dashboard/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
            <div className="sm:text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Blog Post
              </h1>
              <p className="text-gray-600">Update the blog post information</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <DashboardLoading message="Loading blog..." size="sm" />
          </div>
        </div>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <div className="space-y-6">
          <div className="flex flex-col sm:justify-between sm:items-center gap-4">
            <Link href="/blogs">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
            <div className="sm:text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Blog Post
              </h1>
              <p className="text-gray-600">Update the blog post information</p>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Blog post not found</p>
            <Link href="/blogs">
              <Button>Back to Blogs</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex flex-col sm:justify-between sm:items-center gap-4">
          <Link href="/dashboard/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <div className="sm:text-center">
            <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
            <p className="text-gray-600">Update the blog post information</p>
          </div>
        </div>

        <BlogForm
          initialData={{
            id: blog.id,
            title: blog.title,
            content: blog.content,
            cover_image: blog.cover_image,
          }}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </Container>
  );
}
