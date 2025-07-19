"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/shared/container";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import * as Yup from "yup";
import { useFormik } from "formik";

const blogSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters"),
  shortDescription: Yup.string()
    .required("Short description is required")
    .min(10, "Short description must be at least 10 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters"),
});

const EditBlog: React.FC = () => {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (bannerPreview) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [bannerPreview]);

  const formik = useFormik({
    initialValues: {
      title: "Scholarships & Financial Aid for Bangladeshi Students in Japan",
      shortDescription:
        "Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.....",
      content:
        "Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.Key insights into Japanese workplace norms and expectations.....",
    },
    validationSchema: blogSchema,
    onSubmit: async (values) => {
      setIsUpdating(true);
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("shortDescription", values.shortDescription);
        formData.append("content", values.content);

        if (bannerFile) {
          formData.append("banner", bannerFile);
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Blog updated successfully!");
      } catch (error) {
        console.error("Error updating blog:", error);
        toast.error("Failed to update blog.");
      } finally {
        setIsUpdating(false);
      }
    },
  });

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (bannerPreview) {
      URL.revokeObjectURL(bannerPreview);
    }
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
      setBannerFile(file);
    } else {
      setBannerPreview(null);
      setBannerFile(null);
    }
  };

  const handleRemoveBanner = () => {
    if (bannerPreview) {
      URL.revokeObjectURL(bannerPreview);
    }
    setBannerPreview(null);
    setBannerFile(null);
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Container className="py-12 md:py-16 flex justify-center items-center">
        <Card className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Edit Blog
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter blog title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.title && formik.errors.title
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-sm text-red-500">{formik.errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner">Banner</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Upload 1 supported file. Max 10 MB.
                </p>
                <div className="flex items-center gap-4">
                  <Input
                    id="banner"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    ref={bannerInputRef}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => bannerInputRef.current?.click()}
                    className="flex-shrink-0"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <span className="text-sm text-gray-600 truncate flex-grow">
                    {bannerFile ? bannerFile.name : "No file chosen"}
                  </span>
                  {bannerPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={handleRemoveBanner}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {bannerPreview && (
                  <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={bannerPreview}
                      alt="Banner preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Enter blog description"
                  value={formik.values.shortDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={3}
                  className={
                    formik.touched.shortDescription &&
                    formik.errors.shortDescription
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {formik.touched.shortDescription &&
                  formik.errors.shortDescription && (
                    <p className="text-sm text-red-500">
                      {formik.errors.shortDescription}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>

                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter blog content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={10}
                  className={`min-h-[200px] ${
                    formik.touched.content && formik.errors.content
                      ? "border-red-500"
                      : ""
                  }`}
                  required
                />
                {formik.touched.content && formik.errors.content && (
                  <p className="text-sm text-red-500">
                    {formik.errors.content}
                  </p>
                )}
              </div>

              <div className="flex justify-start">
                <Button
                  type="submit"
                  disabled={isUpdating || !formik.isValid}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default EditBlog;
