"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import * as Yup from "yup";
import { useFormik } from "formik";

const membershipApplicationSchema = Yup.object({
  selectedUser: Yup.string().required("User selection is required"),
  fullName: Yup.string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  memberKind: Yup.string().required("Member Kind is required"),
});

interface MembershipApplicationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const MembershipApplicationForm: React.FC<MembershipApplicationFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      selectedUser: "",
      fullName: "",
      phone: "",
      memberKind: "",
    },
    validationSchema: membershipApplicationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("selectedUser", values.selectedUser);
        formData.append("fullName", values.fullName);
        formData.append("phone", values.phone);
        formData.append("memberKind", values.memberKind);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Membership application submitted successfully!");
        formik.resetForm();

        onSuccess();
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit application.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full max-w-3xl rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
      <CardHeader className="p-0 mb-6 text-left">
        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
          Membership Application
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
          Join now to enjoy exclusive benefits and stay connected with our
          community.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Member Information Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Member Information
            </h2>
            <p className="text-sm text-gray-600">
              Fill in the details to add a new organization member
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="selectedUser">Select User *</Label>

                <Input
                  id="selectedUser"
                  name="selectedUser"
                  type="text"
                  placeholder="Type to search for users...."
                  value={formik.values.selectedUser}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.selectedUser && formik.errors.selectedUser
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {formik.touched.selectedUser && formik.errors.selectedUser && (
                  <p className="text-sm text-red-500">
                    {formik.errors.selectedUser}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.fullName && formik.errors.fullName
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-sm text-red-500">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone no."
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>

              {/* Member Kind (Dropdown) */}
              <div className="space-y-2">
                <Label htmlFor="memberKind">Member Kind *</Label>
                <select
                  id="memberKind"
                  name="memberKind"
                  value={formik.values.memberKind}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    formik.touched.memberKind && formik.errors.memberKind
                      ? "border-red-500"
                      : ""
                  }`}
                  required
                >
                  <option value="">Select member kind</option>
                  <option value="ADVISER">Adviser</option>
                  <option value="HONORABLE">Honorable Member</option>
                  <option value="EXECUTIVE">Executive</option>
                  <option value="ASSOCIATE">Associate</option>
                  <option value="STUDENT_REPRESENTATIVE">
                    Student Representative
                  </option>
                </select>
                {formik.touched.memberKind && formik.errors.memberKind && (
                  <p className="text-sm text-red-500">
                    {formik.errors.memberKind}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Approval Required Alert */}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md flex items-start gap-3 mt-6">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Approval Required</p>
              <p className="text-xs">
                New members require approval from an administrator before they
                can access member-only features. The member will be notified
                once their membership is approved.
              </p>
            </div>
          </div>

          <div className="flex justify-start gap-4 mt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Adding Member..." : "Add Member"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MembershipApplicationForm;
