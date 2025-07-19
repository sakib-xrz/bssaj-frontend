"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Upload, X, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import { useFormik } from "formik";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { useCreateAgencyMutation } from "@/redux/features/agency/agencyApi";

const agencySchema = Yup.object({
  name: Yup.string()
    .required("Agency name is required")
    .min(2, "Name must be at least 2 characters"),
  contact_email: Yup.string()
    .email("Invalid email format")
    .required("Contact email is required"),
  contact_phone: Yup.string(),
  website: Yup.string().url("Invalid URL format"),
  director_name: Yup.string(),
  established_year: Yup.number()
    .typeError("Established year must be a number")
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .nullable(),
  description: Yup.string(),
  address: Yup.string(),
  facebook_url: Yup.string().url("Invalid URL format"),
});

const faqs = [
  {
    question: "How long does the application process take?",
    answer: "The application review typically takes 3-5 business days.",
  },
  {
    question: "Can I apply if I'm not currently in Japan?",
    answer:
      "Yes, you can apply if you're planning to come to Japan or have a connection to the Bangladeshi student community in Japan.",
  },
  {
    question: "Is there a discount for long-term membership?",
    answer:
      "We offer discounts for 3-year and 5-year membership commitments. Contact us for details.",
  },
];

const Membership: React.FC = () => {
  const router = useRouter();
  const [createAgency, { isLoading }] = useCreateAgencyMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [successStoryImages, setSuccessStoryImages] = useState<File[]>([]);
  const [successStoryPreviews, setSuccessStoryPreviews] = useState<string[]>(
    []
  );

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
      successStoryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [logoPreview, successStoryPreviews]);

  const formik = useFormik({
    initialValues: {
      name: "",
      contact_email: "",
      contact_phone: "",
      website: "",
      director_name: "",
      established_year: "",
      description: "",
      address: "",
      facebook_url: "",
    },
    validationSchema: agencySchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        for (const key in values) {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            const value = values[key as keyof typeof values];
            if (key === "established_year") {
              if (value) {
                formData.append(key, String(Number(value)));
              }
            } else if (value !== null && value !== undefined) {
              formData.append(key, value);
            }
          }
        }

        if (logoFile) {
          formData.append("logo", logoFile);
        }

        successStoryImages.forEach((file) => {
          formData.append(`successStoryImages`, file);
        });

        formData.append("status", "PENDING");
        formData.append("is_approved", "false");
        formData.append("is_deleted", "false");

        const result = await createAgency(formData).unwrap();
        console.log("Agency created successfully:", result);

        formik.resetForm();
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoFile(null);
        setLogoPreview(null);
        successStoryPreviews.forEach((url) => URL.revokeObjectURL(url));
        setSuccessStoryImages([]);
        setSuccessStoryPreviews([]);

        router.push("/agencies");
        toast.success("Agency created successfully");
      } catch (error) {
        console.error("Error creating agency:", error);
        toast.error("Failed to create agency");
      }
    },
  });

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      setLogoFile(file);
    } else {
      setLogoPreview(null);
      setLogoFile(null);
    }
  };

  const handleSuccessStoryImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setSuccessStoryPreviews((prev) => [...prev, ...newPreviews]);
    setSuccessStoryImages((prev) => [...prev, ...selectedFiles]);

    event.target.value = "";
  };

  const handleRemoveSuccessStory = (index: number) => {
    URL.revokeObjectURL(successStoryPreviews[index]);

    setSuccessStoryPreviews((prev) => prev.filter((_, i) => i !== index));
    setSuccessStoryImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Become a Member"
          description="Join our community by registering your agency to support Bangladeshi students in Japan."
        />
      </div>
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card className="w-full rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
            <CardHeader className="p-0 mb-6 text-center">
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                Register Your Agency
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                Fill out the form below to become a member agency.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Agency Name *</Label>
                      <Input
                        id="name"
                        name="name"
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
                        <p className="text-sm text-red-500">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="director_name">Director Name</Label>
                      <Input
                        id="director_name"
                        name="director_name"
                        placeholder="Enter director name"
                        value={formik.values.director_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Agency Logo</Label>
                    <div className="flex flex-col gap-4">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                      {logoPreview ? (
                        <div className="relative w-40 h-40">
                          <Image
                            src={logoPreview}
                            alt="Logo preview"
                            width={160}
                            height={160}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                            onClick={() => {
                              URL.revokeObjectURL(logoPreview);
                              setLogoPreview(null);
                              setLogoFile(null);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("logo")?.click()
                          }
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter agency description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
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
                          formik.touched.contact_email &&
                          formik.errors.contact_email
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
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter agency address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
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
                          formik.touched.facebook_url &&
                          formik.errors.facebook_url
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {formik.touched.facebook_url &&
                        formik.errors.facebook_url && (
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Success Stories
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="success_stories">
                      Success Story Images
                    </Label>
                    <div className="flex flex-col gap-4">
                      <Input
                        id="success_stories"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleSuccessStoryImagesChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("success_stories")?.click()
                        }
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Success Story Images
                      </Button>
                      {successStoryImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {successStoryImages.map((file, index) => (
                            <div
                              key={file.name + index}
                              className="relative w-full aspect-square"
                            >
                              <Image
                                src={successStoryPreviews[index]}
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
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Link href="/agencies">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={isLoading || !formik.isValid}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? "Creating Agency..." : "Create Agency"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-8">
            <Card className="w-full rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary mb-2">
                  Membership FAQ&#39;s
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="w-full rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary mb-2">
                  Need Help?
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                  If you have any questions or need assistance with your
                  application, we&#39;re here to help.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-[#00AEEF] rounded-full">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Call Us</div>
                    <div className="font-medium text-[#003366]">
                      +881-XXXXXXXXXX
                    </div>
                    <div className="text-xs text-gray-500">
                      Monday to Friday, 9:00 AM - 5:00 PM JST
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-[#003366] rounded-full">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Email Us</div>
                    <div className="font-medium text-[#003366]">
                      membership@bssaj.com
                    </div>
                    <div className="text-xs text-gray-500">
                      We&#39;ll respond within 24 hours
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Membership;
