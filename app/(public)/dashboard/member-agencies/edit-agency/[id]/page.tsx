// "use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateAgencyMutation,
  useUpdateAgencyMutation,
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
  successStoryImages: string[];
  status: "Approved" | "Pending";
  is_approved: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

interface AgencyFormProps {
  initialData?: Agency;
  onSuccess: () => void;
  onCancel: () => void;
}

// const agencySchema = Yup.object({
//   name: Yup.string()
//     .required("Agency name is required")
//     .min(2, "Name must be at least 2 characters"),
//   category: Yup.string().required("Category is required"),
//   location: Yup.string().required("Location is required"),
//   description: Yup.string()
//     .required("Description is required")
//     .min(10, "Description must be at least 10 characters"),
//   contact_email: Yup.string()
//     .email("Invalid email format")
//     .required("Contact email is required"),
//   contact_phone: Yup.string(),
//   website: Yup.string().url("Invalid URL format").nullable(),
//   director_name: Yup.string().nullable(),
//   established_year: Yup.number()
//     .typeError("Established year must be a number")
//     .min(1900, "Invalid year")
//     .max(new Date().getFullYear(), "Year cannot be in the future")
//     .nullable(),
//   address: Yup.string().nullable(),
//   facebook_url: Yup.string().url("Invalid URL format").nullable(),
// });

export function AgencyForm({
  initialData,
  onSuccess,
  onCancel,
}: AgencyFormProps) {
  const [createAgency] = useCreateAgencyMutation();
  const [updateAgency] = useUpdateAgencyMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.logo || null
  ); // Use initialData.logo for preview
  const [successStoryImages, setSuccessStoryImages] = useState<File[]>([]);
  const [successStoryPreviews, setSuccessStoryPreviews] = useState<string[]>(
    initialData?.successStoryImages || []
  );

  const logoInputRef = useRef<HTMLInputElement>(null);
  const successStoriesInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     return () => {
//       if (logoPreview && !initialData?.logo) {
//         URL.revokeObjectURL(logoPreview);
//       }
//       successStoryPreviews.forEach((url) => {
//         if (!initialData?.successStoryImages?.includes(url)) {
//           URL.revokeObjectURL(url);
//         }
//       });
//     };
//   }, [logoPreview, successStoryPreviews, initialData]);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      location: initialData?.location || "",
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
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();

//         // Append all form values
//         for (const key in values) {
//           if (Object.prototype.hasOwnProperty.call(values, key)) {
//             const value = values[key as keyof typeof values];
//             if (key === "established_year") {
//               if (value) {
//                 formData.append(key, String(Number(value)));
//               }
//             } else if (value !== null && value !== undefined) {
//               formData.append(key, value);
//             }
//           }
//         }

//         // Append logo file if changed
//         if (logoFile) {
//           formData.append("logo", logoFile);
//         }

//         // Append new success story images
//         successStoryImages.forEach((file) => {
//           formData.append(`successStoryImages`, file);
//         });

        if (initialData) {
          await updateAgency({ id: initialData.id, data: formData }).unwrap();
          toast.success("Agency updated successfully!");
        } else {
          formData.append("status", "PENDING");
          formData.append("is_approved", "false");
          formData.append("is_deleted", "false");
          await createAgency(formData).unwrap();
          toast.success("Agency created successfully!");
        }

        onSuccess();
      } catch (error) {
        console.error("Error submitting agency form:", error);
        toast.error(`Failed to ${initialData ? "update" : "create"} agency.`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

//   const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (logoPreview && !initialData?.logo) {
//       URL.revokeObjectURL(logoPreview);
//     }
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setLogoPreview(previewUrl);
//       setLogoFile(file);
//     } else {
//       setLogoPreview(initialData?.logo || null);
//       setLogoFile(null);
//     }
//   };

//   const handleRemoveLogo = () => {
//     if (logoPreview && !initialData?.logo) {
//       URL.revokeObjectURL(logoPreview);
//     }
//     setLogoPreview(null);
//     setLogoFile(null);
//     if (logoInputRef.current) {
//       logoInputRef.current.value = "";
//     }
//   };

//   const handleSuccessStoryImagesChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const selectedFiles = Array.from(event.target.files || []);
//     const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

//     setSuccessStoryPreviews((prev) => [...prev, ...newPreviews]);
//     setSuccessStoryImages((prev) => [...prev, ...selectedFiles]);

//     event.target.value = ""; // Clear input to allow re-selection of same files
//   };

//   const handleRemoveSuccessStory = (indexToRemove: number) => {
//     const previewUrlToRemove = successStoryPreviews[indexToRemove];
//     if (
//       previewUrlToRemove &&
//       !initialData?.successStoryImages?.includes(previewUrlToRemove)
//     ) {
//       URL.revokeObjectURL(previewUrlToRemove);
//     }

//     setSuccessStoryPreviews((prev) =>
//       prev.filter((_, i) => i !== indexToRemove)
//     );
//     setSuccessStoryImages((prev) => prev.filter((_, i) => i !== indexToRemove));
//   };

  const categories = [
    "Education",
    "Consultancy",
    "Visa & Immigration",
    "Career Guidance",
    "Community Support",
    "Technology Training",
    "Government",
    "International Organization",
  ];

//   return (
//     <Card className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 mx-auto">
//       <CardHeader className="p-0 mb-6">
//         <CardTitle className="text-2xl font-bold text-gray-900">
//           {initialData ? "Edit Agency" : "Create New Agency"}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <form onSubmit={formik.handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <Label htmlFor="name">Agency Name *</Label>
//             <Input
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Enter agency name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className={
//                 formik.touched.name && formik.errors.name
//                   ? "border-red-500"
//                   : ""
//               }
//             />
//             {formik.touched.name && formik.errors.name && (
//               <p className="text-sm text-red-500">{formik.errors.name}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="logo">Agency Logo</Label>
//             <p className="text-sm text-gray-500 mb-2">
//               Upload 1 supported file. Max 10 MB.
//             </p>
//             <div className="flex items-center gap-4">
//               <Input
//                 id="logo"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoChange}
//                 ref={logoInputRef}
//                 className="hidden"
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => logoInputRef.current?.click()}
//                 className="flex-shrink-0"
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 Choose File
//               </Button>
//               <span className="text-sm text-gray-600 truncate flex-grow">
//                 {logoFile
//                   ? logoFile.name
//                   : initialData?.logo
//                     ? "Existing logo"
//                     : "No file chosen"}
//               </span>
//               {(logoPreview || initialData?.logo) && (
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="icon"
//                   className="flex-shrink-0"
//                   onClick={handleRemoveLogo}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               )}
//             </div>
//             {(logoPreview || initialData?.logo) && (
//               <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
//                 <Image
//                   src={logoPreview || initialData?.logo || "/placeholder.svg"}
//                   alt="Logo preview"
//                   fill
//                   className="object-contain" // Use object-contain for logos
//                 />
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="category">Select Category *</Label>
//               <Select
//                 value={formik.values.category}
//                 onValueChange={(value) =>
//                   formik.setFieldValue("category", value)
//                 }
//                 onOpenChange={() => formik.setFieldTouched("category", true)}
//               >
//                 <SelectTrigger
//                   className={
//                     formik.touched.category && formik.errors.category
//                       ? "border-red-500"
//                       : ""
//                   }
//                 >
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat} value={cat}>
//                       {cat}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {formik.touched.category && formik.errors.category && (
//                 <p className="text-sm text-red-500">{formik.errors.category}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="location">Location *</Label>
//               <Input
//                 id="location"
//                 name="location"
//                 type="text"
//                 placeholder="Enter location (e.g., Tokyo)"
//                 value={formik.values.location}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={
//                   formik.touched.location && formik.errors.location
//                     ? "border-red-500"
//                     : ""
//                 }
//               />
//               {formik.touched.location && formik.errors.location && (
//                 <p className="text-sm text-red-500">{formik.errors.location}</p>
//               )}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="description">Short Description *</Label>
//             <Textarea
//               id="description"
//               name="description"
//               placeholder="Enter a short description of the agency"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               rows={3}
//               className={
//                 formik.touched.description && formik.errors.description
//                   ? "border-red-500"
//                   : ""
//               }
//             />
//             {formik.touched.description && formik.errors.description && (
//               <p className="text-sm text-red-500">
//                 {formik.errors.description}
//               </p>
//             )}
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-4 pt-4">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Contact Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="contact_email">Contact Email *</Label>
//                 <Input
//                   id="contact_email"
//                   name="contact_email"
//                   type="email"
//                   placeholder="Enter contact email"
//                   value={formik.values.contact_email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={
//                     formik.touched.contact_email && formik.errors.contact_email
//                       ? "border-red-500"
//                       : ""
//                   }
//                 />
//                 {formik.touched.contact_email &&
//                   formik.errors.contact_email && (
//                     <p className="text-sm text-red-500">
//                       {formik.errors.contact_email}
//                     </p>
//                   )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="contact_phone">Contact Phone</Label>
//                 <Input
//                   id="contact_phone"
//                   name="contact_phone"
//                   placeholder="Enter contact phone"
//                   value={formik.values.contact_phone}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="address">Full Address</Label>
//               <Textarea
//                 id="address"
//                 name="address"
//                 placeholder="Enter full agency address"
//                 value={formik.values.address}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 rows={3}
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="website">Website URL</Label>
//                 <Input
//                   id="website"
//                   name="website"
//                   placeholder="https://example.com"
//                   value={formik.values.website}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={
//                     formik.touched.website && formik.errors.website
//                       ? "border-red-500"
//                       : ""
//                   }
//                 />
//                 {formik.touched.website && formik.errors.website && (
//                   <p className="text-sm text-red-500">
//                     {formik.errors.website}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="facebook_url">Facebook URL</Label>
//                 <Input
//                   id="facebook_url"
//                   name="facebook_url"
//                   placeholder="https://facebook.com/agency"
//                   value={formik.values.facebook_url}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className={
//                     formik.touched.facebook_url && formik.errors.facebook_url
//                       ? "border-red-500"
//                       : ""
//                   }
//                 />
//                 {formik.touched.facebook_url && formik.errors.facebook_url && (
//                   <p className="text-sm text-red-500">
//                     {formik.errors.facebook_url}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="established_year">Established Year</Label>
//               <Input
//                 id="established_year"
//                 name="established_year"
//                 type="number"
//                 placeholder="2020"
//                 value={formik.values.established_year}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={
//                   formik.touched.established_year &&
//                     formik.errors.established_year
//                     ? "border-red-500"
//                     : ""
//                 }
//               />
//               {formik.touched.established_year &&
//                 formik.errors.established_year && (
//                   <p className="text-sm text-red-500">
//                     {formik.errors.established_year}
//                   </p>
//                 )}
//             </div>
//           </div>

//           {/* Success Stories */}
//           <div className="space-y-4 pt-4">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Success Stories
//             </h3>

//             <div className="space-y-2">
//               <Label htmlFor="success_stories">
//                 Success Story Images (Max 5)
//               </Label>
//               <p className="text-sm text-gray-500 mb-2">
//                 Upload up to 5 supported files. Max 10 MB per file.
//               </p>
//               <div className="flex flex-col gap-4">
//                 <Input
//                   id="success_stories"
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleSuccessStoryImagesChange}
//                   ref={successStoriesInputRef}
//                   className="hidden"
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => successStoriesInputRef.current?.click()}
//                   disabled={
//                     successStoryImages.length +
//                     successStoryPreviews.filter((p) =>
//                       initialData?.successStoryImages?.includes(p)
//                     ).length >=
//                     5
//                   }
//                 >
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload Success Story Images
//                 </Button>
//                 {successStoryPreviews.length > 0 && (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                     {successStoryPreviews.map((url, index) => (
//                       <div key={url} className="relative w-full aspect-square">
//                         <Image
//                           src={url}
//                           alt={`Success story ${index + 1}`}
//                           fill
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="icon"
//                           className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
//                           onClick={() => handleRemoveSuccessStory(index)}
//                         >
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4 pt-6">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={isSubmitting || !formik.isValid}
//               className="bg-primary hover:bg-primary/90"
//             >
//               {isSubmitting
//                 ? initialData
//                   ? "Updating..."
//                   : "Creating..."
//                 : initialData
//                   ? "Update Agency"
//                   : "Create Agency"}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
import React from 'react'

function page() {
  return (
    <Card className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 mx-auto">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Agency" : "Create New Agency"}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Select Category *</Label>
              <Select
                value={formik.values.category}
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
                onOpenChange={() => formik.setFieldTouched("category", true)}
              >
                <SelectTrigger
                  className={
                    formik.touched.category && formik.errors.category
                      ? "border-red-500"
                      : ""
                  }
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-sm text-red-500">{formik.errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location (e.g., Tokyo)"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.location && formik.errors.location
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.location && formik.errors.location && (
                <p className="text-sm text-red-500">{formik.errors.location}</p>
              )}
            </div>
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
                  disabled={
                    successStoryImages.length +
                      successStoryPreviews.filter((p) =>
                        initialData?.successStoryImages?.includes(p)
                      ).length >=
                    5
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Success Story Images
                </Button>
                {successStoryPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {successStoryPreviews.map((url, index) => (
                      <div key={url} className="relative w-full aspect-square">
                        <Image
                          src={url}
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

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting
                ? initialData
                  ? "Updating..."
                  : "Creating..."
                : initialData
                  ? "Update Agency"
                  : "Create Agency"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
