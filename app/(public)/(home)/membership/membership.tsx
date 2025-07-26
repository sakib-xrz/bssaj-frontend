"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAgencyMutation } from "@/redux/features/agency/agencyApi";
import { useFormik } from "formik";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

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

const Membership = () => {

  const router = useRouter();
  const [createAgency, { isLoading }] = useCreateAgencyMutation();

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
      user_selection_type: "new",
      user_id: "",
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


        formData.append("status", "PENDING");
        formData.append("is_approved", "false");
        formData.append("is_deleted", "false");

        await createAgency(formData).unwrap();
        formik.resetForm();
        router.push("/agencies");
        toast.success("Agency created successfully");
      } catch (error) {
        console.error("Error creating agency:", error);
        toast.error("Failed to create agency");
      }
    },
  });



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
