"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogForm } from "../_components/blog-form";

export default function CreateBlogPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/dashboard/blog");
  };

  const handleCancel = () => {
    router.push("/dashboard/blog");
  };

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
              Create Blog Post
            </h1>
            <p className="text-gray-600">
              Create a new blog post for the organization
            </p>
          </div>
        </div>

        <BlogForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </Container>
  );
}
