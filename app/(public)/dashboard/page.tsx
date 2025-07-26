/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/components/shared/container";
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
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useGetMyInfoQuery } from "@/redux/features/get-me/get_me";
import {
  useUpdateProfilePitcherMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useFormik } from "formik";
import { CameraIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const myProfileSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ManageProfile = () => {
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const user = useGetMyInfoQuery();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addNewProfilePitcher] = useUpdateProfilePitcherMutation();
  const [updateUserInfo] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    "/images/bssaj-logo.jpeg"
  );

  const myProfileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.data?.name || "",
      role: user?.data?.role || "",
      email: user?.data?.email || "",
    },
    validationSchema: myProfileSchema,
    onSubmit: async (values) => {
      try {
        const userinformation = { name: values.name };
        const res = await updateUserInfo(userinformation);

        if (res?.data?.success) {
          console.log("Profile updated:", res);
          toast.success(res?.data?.message || "Profile updated successfully.");
        } else {
          // If res is not successful but no error thrown
          console.warn("Profile update failed:", res);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile.");
      }
    },
  });
  const changePasswordSchema = Yup.object({
    old_password: Yup.string().required("Current password is required"),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("new_password")], "Passwords must match"),
  });

  const changePasswordFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      old_password: "",
      new_password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          old_password: values.old_password,
          new_password: values.new_password,
        };
        const res = await changePassword(payload);

        if (res?.data?.success) {
          toast.success(res?.data?.message);
        } else {
          const errorMessage =
            (res as any)?.error?.data?.message || "Something went wrong";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    return () => {
      if (profileImagePreview && profileImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview]);

  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (profileImagePreview && profileImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(profileImagePreview);
    }

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl);

      try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await addNewProfilePitcher(formData);

        if (res?.data?.statusCode === 200) {
          toast.success(res?.data?.message);
        }

        if (res?.error) {
          if ("data" in res.error) {
            toast.error(
              (res.error.data as any)?.message || "Something went wrong"
            );
          } else {
            toast.error("An unexpected error occurred");
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to update profile picture.");
      }
    } else {
      setProfileImagePreview("/images/placeholder-avatar.png");
    }
  };
  return (
    <Container className="py-12 md:py-16 flex justify-center items-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* My Profile Card */}
        <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              My Profile
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Update your personal information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={myProfileFormik.handleSubmit} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  {/* Circle wrapper with overflow-hidden and rounded-full */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md relative">
                    <Image
                      src={
                        user?.data?.profile_picture ||
                        profileImagePreview ||
                        "/images/bssaj-logo.jpeg"
                      }
                      alt="Profile Picture"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Camera icon positioned absolutely relative to the outer div */}
                  <button
                    type="button"
                    onClick={() => profileImageInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 p-3 rounded-full shadow-lg bg-gray-100 border border-gray-300 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    <CameraIcon className="w-5 h-5 text-blue-800" />
                  </button>

                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    ref={profileImageInputRef}
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={myProfileFormik.values.name}
                    onChange={myProfileFormik.handleChange}
                    onBlur={myProfileFormik.handleBlur}
                    className={
                      myProfileFormik.touched.name &&
                      myProfileFormik.errors.name
                        ? "border-red-500"
                        : ""
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    value={myProfileFormik.values.role}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    disabled
                    placeholder="Enter your email"
                    value={myProfileFormik.values.email}
                    onChange={myProfileFormik.handleChange}
                    onBlur={myProfileFormik.handleBlur}
                    className={
                      myProfileFormik.touched.email &&
                      myProfileFormik.errors.email
                        ? "border-red-500"
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="flex justify-start">
                <Button
                  type="submit"
                  disabled={
                    myProfileFormik.isSubmitting || !myProfileFormik.isValid
                  }
                >
                  {myProfileFormik.isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* change password  */}
        <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Change Password
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form
              onSubmit={changePasswordFormik.handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* old password  */}
                <div className="space-y-2">
                  <Label htmlFor="old_password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="old_password"
                      name="old_password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={changePasswordFormik.values.old_password}
                      onChange={changePasswordFormik.handleChange}
                      onBlur={changePasswordFormik.handleBlur}
                      className={
                        changePasswordFormik.touched.old_password &&
                        changePasswordFormik.errors.old_password
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {changePasswordFormik.touched.old_password &&
                    changePasswordFormik.errors.old_password && (
                      <p className="text-sm text-red-500">
                        {changePasswordFormik.errors.old_password}
                      </p>
                    )}
                </div>

                {/* New Password  */}
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new_password"
                      name="new_password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={changePasswordFormik.values.new_password}
                      onChange={changePasswordFormik.handleChange}
                      onBlur={changePasswordFormik.handleBlur}
                      className={
                        changePasswordFormik.touched.new_password &&
                        changePasswordFormik.errors.new_password
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-gray-100"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {changePasswordFormik.touched.new_password &&
                    changePasswordFormik.errors.new_password && (
                      <p className="text-sm text-red-500">
                        {changePasswordFormik.errors.new_password}
                      </p>
                    )}
                </div>
              </div>

              {/* confirm  */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={changePasswordFormik.values.confirmPassword}
                  onChange={changePasswordFormik.handleChange}
                  onBlur={changePasswordFormik.handleBlur}
                  className={
                    changePasswordFormik.touched.confirmPassword &&
                    changePasswordFormik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }
                  required
                />
                {changePasswordFormik.touched.confirmPassword &&
                  changePasswordFormik.errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {changePasswordFormik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="flex justify-start">
                <Button
                  type="submit"
                  disabled={
                    changePasswordFormik.isSubmitting ||
                    !changePasswordFormik.isValid
                  }
                >
                  {changePasswordFormik.isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ManageProfile;
