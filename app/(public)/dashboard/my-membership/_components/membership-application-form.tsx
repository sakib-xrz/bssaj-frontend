/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { useAuthUser } from "@/redux/features/auth/authSlice";
import { useCreateMemberMutation } from "@/redux/features/member/memberApi";
import { useFormik } from "formik";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const memberKinds = [
  { value: "ADVISER", label: "Adviser" },
  { value: "HONORABLE", label: "Honorable" },
  { value: "EXECUTIVE", label: "Executive" },
  { value: "ASSOCIATE", label: "Associate" },
  { value: "STUDENT_REPRESENTATIVE", label: "Student Representative" },
];

const membershipApplicationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  kind: Yup.string().required("Member Kind is required"),
});

interface MembershipApplicationFormProps {
  onSuccess: () => void;
}

const MembershipApplicationForm: React.FC<MembershipApplicationFormProps> = ({
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useAuthUser();
  const [memberRequest] = useCreateMemberMutation()
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      kind: "",
    },
    validationSchema: membershipApplicationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const mainData = { ...values, user_id: user?.id };
      try {
        const res = await memberRequest(mainData)
        // const res = await 
        if (res?.data?.success) {
          toast.success(res?.data?.message);
        } else {
          const errorMessage = (res as any)?.error?.data?.message || "Something went wrong";
          toast.error(errorMessage);
        }
        onSuccess();
      } catch (error) {
        console.error("Error submitting membership application:", error);
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
          Join now to enjoy exclusive benefits and stay connected with our community.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" value={formik.values.name} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" value={formik.values.email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.phone && formik.errors.phone ? "border-red-500" : ""
                }
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-sm text-red-500">{formik.errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="kind">Member Kind *</Label>
              <select
                id="kind"
                name="kind"
                value={formik.values.kind}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm text-black appearance-none outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 bg-transparent ${formik.touched.kind && formik.errors.kind ? "border-red-500" : ""
                  }`}
              >
                <option value="">Select member kind</option>
                {memberKinds.map((kind) => (
                  <option key={kind.value} value={kind.value}>
                    {kind.label}
                  </option>
                ))}
              </select>
              {formik.touched.kind && formik.errors.kind && (
                <p className="text-sm text-red-500">{formik.errors.kind}</p>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md flex items-start gap-3 mt-6">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Approval Required</p>
              <p className="text-xs">
                New members require approval from an administrator before they can
                access member-only features. You will be notified after approval.
              </p>
            </div>
          </div>

          <div className="flex justify-start gap-4 mt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !formik.isValid || !formik.dirty}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Submitting..." : "Apply"}
            </Button>
            <Button type="button" variant="outline" onClick={formik.handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MembershipApplicationForm;
