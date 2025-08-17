"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

import {
  useGetAgencyByIdQuery,
  useUpdateAgencyMutation,
  useUploadSuccessStoryMutation,
  useDeleteSuccessStoryMutation,
} from "@/redux/features/agency/agencyApi";

export type Agency = {
  id: string;
  name: string;
  logo: string | null;
  category: string;
  location: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  director_name: string;
  established_year: number;
  address: string;
  facebook_url: string;
  success_stories?: Array<{
    id: string;
    agency_id: string;
    image: string;
  }>;
  successStoryImages?: string[];
  status: "Approved" | "Pending";
  is_approved: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

const agencySchema = Yup.object({
  name: Yup.string()
    .required("Agency name is required")
    .min(2, "Name must be at least 2 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  contact_email: Yup.string()
    .email("Invalid email format")
    .required("Contact email is required"),
  contact_phone: Yup.string(),
  website: Yup.string().url("Invalid URL format").nullable(),
  director_name: Yup.string().nullable(),
  established_year: Yup.number()
    .typeError("Established year must be a number")
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .nullable(),
  address: Yup.string().nullable(),
  facebook_url: Yup.string().url("Invalid URL format").nullable(),
});

export default function EditAgencyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const agencyId = params.id;

  // Destructure all necessary mutations
  const [updateAgency] = useUpdateAgencyMutation();
  const [uploadSuccessStory] = useUploadSuccessStoryMutation();
  const [deleteSuccessStory] = useDeleteSuccessStoryMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: agencyData,
    isLoading,
    isError,
    error,
  } = useGetAgencyByIdQuery(agencyId);

  const initialData: Agency | undefined = agencyData?.data;

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // States to manage success stories
  const [newSuccessStoryFiles, setNewSuccessStoryFiles] = useState<File[]>([]);
  const [removedSuccessStoryIds, setRemovedSuccessStoryIds] = useState<
    string[]
  >([]);
  const [successStoryPreviews, setSuccessStoryPreviews] = useState<
    Array<{ id: string | null; url: string }>
  >([]);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const successStoriesInputRef = useRef<HTMLInputElement>(null);

  // Update previews when initialData changes
  useEffect(() => {
    if (initialData) {
      setLogoPreview(initialData.logo);

      let existingSuccessStories = initialData.success_stories || [];
      // Fallback for backward compatibility
      if (
        initialData.successStoryImages &&
        initialData.successStoryImages.length > 0
      ) {
        existingSuccessStories = initialData.successStoryImages.map((url) => ({
          id: url.split("/").pop() || "", // Use a unique identifier from the URL
          agency_id: initialData.id,
          image: url,
        }));
      }

      setSuccessStoryPreviews(
        existingSuccessStories.map((story) => ({
          id: story.id,
          url: story.image,
        }))
      );
    }
  }, [initialData]);

  useEffect(() => {
    return () => {
      // Cleanup for new blob URLs
      successStoryPreviews.forEach((preview) => {
        if (
          !initialData?.success_stories?.some(
            (story) => story.id === preview.id
          )
        ) {
          URL.revokeObjectURL(preview.url);
        }
      });
      if (logoPreview && !initialData?.logo) {
        URL.revokeObjectURL(logoPreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoPreview, successStoryPreviews, initialData]);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      contact_email: initialData?.contact_email || "",
      contact_phone: initialData?.contact_phone || "",
      website: initialData?.website || "",
      director_name: initialData?.director_name || "",
      established_year: initialData?.established_year
        ? String(initialData.established_year)
        : "",
      address: initialData?.address || "",
      facebook_url: initialData?.facebook_url || "",
    },
    validationSchema: agencySchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!initialData) return;

      setIsSubmitting(true);
      try {
        // Step 1: Update main agency data
        const agencyFormData = new FormData();
        for (const key in values) {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            const value = values[key as keyof typeof values];
            if (key === "established_year") {
              if (value) {
                agencyFormData.append(key, String(Number(value)));
              }
            } else if (value !== null && value !== undefined) {
              agencyFormData.append(key, value);
            }
          }
        }
        if (logoFile) {
          agencyFormData.append("logo", logoFile);
        }

        await updateAgency({
          id: initialData.id,
          data: agencyFormData,
        }).unwrap();
        toast.success("Agency details updated successfully!");

        // Step 2: Handle deletions of old success stories
        if (removedSuccessStoryIds.length > 0) {
          await Promise.all(
            removedSuccessStoryIds.map((id) => deleteSuccessStory(id).unwrap())
          );
          toast.success("Removed old success stories!");
        }

        // Step 3: Handle uploads of new success stories
        if (newSuccessStoryFiles.length > 0) {
          const uploadPromises = newSuccessStoryFiles.map((file) => {
            const storyFormData = new FormData();
            storyFormData.append("agency_id", initialData.id);
            storyFormData.append("image", file);
            return uploadSuccessStory(storyFormData).unwrap();
          });
          await Promise.all(uploadPromises);
          toast.success("Uploaded new success stories!");
        }

        router.push("/dashboard/member-agencies");
      } catch (error) {
        console.error("Error updating agency:", error);
        toast.error("Failed to update agency.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (logoPreview && !initialData?.logo) {
      URL.revokeObjectURL(logoPreview);
    }
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setLogoFile(file);
    } else {
      setLogoPreview(initialData?.logo || null);
      setLogoFile(null);
    }
  };

  const handleRemoveLogo = () => {
    if (logoPreview && !initialData?.logo) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(null);
    setLogoFile(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const handleSuccessStoryImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setNewSuccessStoryFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => ({
      id: null, // New files have no existing ID
      url: URL.createObjectURL(file),
    }));
    setSuccessStoryPreviews((prev) => [...prev, ...newPreviews]);

    event.target.value = ""; // Clear input to allow re-selection of same files
  };

  const handleRemoveSuccessStory = (indexToRemove: number) => {
    const storyToRemove = successStoryPreviews[indexToRemove];

    if (storyToRemove.id) {
      // If the story has an ID, it's an existing one to be deleted
      setRemovedSuccessStoryIds((prev) => [
        ...prev,
        storyToRemove.id as string,
      ]);
    } else {
      // If it doesn't have an ID, it's a new file to be removed from the upload queue
      const fileIndex = newSuccessStoryFiles.findIndex(
        (file) => file.name === storyToRemove.url.split("/").pop() // Find by name, a simple way to match
      );
      if (fileIndex > -1) {
        URL.revokeObjectURL(storyToRemove.url);
        setNewSuccessStoryFiles((prev) =>
          prev.filter((_, i) => i !== fileIndex)
        );
      }
    }

    setSuccessStoryPreviews((prev) =>
      prev.filter((_, i) => i !== indexToRemove)
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <Loader2 className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin mb-4" />
        <p className="text-lg text-primary font-semibold">
          Loading agency details...
        </p>
      </div>
    );
  }

  // Error state
  if (isError) {
    console.error("Failed to fetch agency details:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <p className="text-lg text-red-500">
          Error loading agency details. Please try again later.
        </p>
        <Button
          onClick={() => router.push("/dashboard/member-agencies")}
          className="mt-4"
        >
          Back to Agencies
        </Button>
      </div>
    );
  }

  // Agency not found
  if (!initialData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 md:py-16 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Agency Not Found
        </h2>
        <p className="text-center text-gray-600 mb-4">
          The agency you are looking for does not exist.
        </p>
        <Button onClick={() => router.push("/dashboard/member-agencies")}>
          Back to Agencies
        </Button>
      </div>
    );
  }

  const { newCount } = {
    newCount: newSuccessStoryFiles.length,
  };

  const existingCount =
    (initialData?.success_stories?.length || 0) - removedSuccessStoryIds.length;

  return (
    <Card className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 mx-auto">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Edit Agency
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Agency Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter agency name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Agency Logo</Label>
            <p className="text-sm text-gray-500 mb-2">
              Upload 1 supported file. Max 10 MB.
            </p>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                ref={logoInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => logoInputRef.current?.click()}
                className="flex-shrink-0"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <span className="text-sm text-gray-600 truncate flex-grow">
                {logoFile
                  ? logoFile.name
                  : initialData?.logo
                    ? "Existing logo"
                    : "No file chosen"}
              </span>
              {(logoPreview || initialData?.logo) && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="flex-shrink-0"
                  onClick={handleRemoveLogo}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {(logoPreview || initialData?.logo) && (
              <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={logoPreview || initialData?.logo || "/placeholder.svg"}
                  alt="Logo preview"
                  fill
                  className="object-contain" // Use object-contain for logos
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter a short description of the agency"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className={
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email *</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  placeholder="Enter contact email"
                  value={formik.values.contact_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.contact_email && formik.errors.contact_email
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.contact_email &&
                  formik.errors.contact_email && (
                    <p className="text-sm text-red-500">
                      {formik.errors.contact_email}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  placeholder="Enter contact phone"
                  value={formik.values.contact_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter full agency address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://example.com"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.website && formik.errors.website
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.website && formik.errors.website && (
                  <p className="text-sm text-red-500">
                    {formik.errors.website}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  name="facebook_url"
                  placeholder="https://facebook.com/agency"
                  value={formik.values.facebook_url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.facebook_url && formik.errors.facebook_url
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.facebook_url && formik.errors.facebook_url && (
                  <p className="text-sm text-red-500">
                    {formik.errors.facebook_url}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="established_year">Established Year</Label>
              <Input
                id="established_year"
                name="established_year"
                type="number"
                placeholder="2020"
                value={formik.values.established_year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.established_year &&
                  formik.errors.established_year
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.established_year &&
                formik.errors.established_year && (
                  <p className="text-sm text-red-500">
                    {formik.errors.established_year}
                  </p>
                )}
            </div>
          </div>

          {/* Success Stories */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Success Stories
            </h3>

            <div className="space-y-2">
              <Label htmlFor="success_stories">
                Success Story Images (Max 5)
              </Label>
              <p className="text-sm text-gray-500 mb-2">
                Upload up to 5 supported files. Max 10 MB per file.
              </p>
              <div className="flex flex-col gap-4">
                <Input
                  id="success_stories"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleSuccessStoryImagesChange}
                  ref={successStoriesInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => successStoriesInputRef.current?.click()}
                  disabled={successStoryPreviews.length >= 5}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Success Story Images
                </Button>
                {successStoryPreviews.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    No success story images uploaded yet. Upload up to 5 images
                    to showcase your agency&apos;s achievements.
                  </p>
                )}
                {successStoryPreviews.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {successStoryPreviews.map((preview, index) => (
                        <div
                          key={preview.url}
                          className="relative w-full aspect-square"
                        >
                          <Image
                            src={preview.url}
                            alt={`Success story ${index + 1}`}
                            fill
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => handleRemoveSuccessStory(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {preview.id && (
                            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Existing
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {successStoryPreviews.length} of 5 images selected
                      <span className="ml-2 text-blue-600">
                        ({existingCount} existing, {newCount} new)
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/member-agencies")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Updating..." : "Update Agency"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
