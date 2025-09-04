/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { format, parseISO } from "date-fns";
import { CalendarIcon, UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useGetMyAgenciesQuery } from "@/redux/features/agency/agencyApi";
import {
  useGetSingleCartificateQuery,
  useUpdateCertificateMutation,
} from "@/redux/features/certificate/certificateApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormValues {
  name: string;
  date_of_birth: Date | undefined;
  gender: string;
  father_name: string;
  mother_name: string;
  student_id: string;
  agency_id: string;
  completed_hours: string;
  grade: string;
  course_duration: string;
  issued_at: Date | undefined;
  institute_name: string;
  certificate_file?: File | null;
}

export default function StudentCertificateEditForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: singleCartificate, isLoading: isCertificateLoading } =
    useGetSingleCartificateQuery(id);
  const { data: agenciesData } = useGetMyAgenciesQuery(undefined);
  const [updateData, { isLoading }] = useUpdateCertificateMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const allMyAgency = agenciesData?.data?.map(
    (item: { name: string; id: string }) => ({
      name: item.name,
      value: item.id,
    })
  );

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      father_name: "",
      mother_name: "",
      student_id: "",
      agency_id: "",
      completed_hours: "",
      grade: singleCartificate?.value,
      course_duration: "",
      institute_name: "",
      date_of_birth: undefined,
      issued_at: undefined,
      gender: singleCartificate?.data?.gender,
      certificate_file: null,
    },
  });

  useEffect(() => {
    if (singleCartificate?.data) {
      const certificate = singleCartificate.data;
      form.reset({
        name: certificate.name || "",
        father_name: certificate.father_name || "",
        mother_name: certificate.mother_name || "",
        student_id: certificate.student_id || "",
        agency_id: certificate.agency_id || "",
        completed_hours: certificate.completed_hours || "",
        grade: certificate.grade || "",
        course_duration: certificate.course_duration || "",
        institute_name: certificate.institute_name || "",
        date_of_birth: certificate.date_of_birth
          ? parseISO(certificate.date_of_birth)
          : undefined,
        issued_at: certificate.issued_at
          ? parseISO(certificate.issued_at)
          : undefined,
        gender: certificate.gender || "",
        certificate_file: null,
      });
    }
  }, [singleCartificate, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      form.setValue("certificate_file", file);
    }
  };

  async function onSubmit(values: FormValues) {
    if (!values.date_of_birth || !values.issued_at) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append(
        "date_of_birth",
        format(values.date_of_birth, "yyyy-MM-dd")
      );
      formData.append("gender", values.gender);
      formData.append("father_name", values.father_name);
      formData.append("mother_name", values.mother_name);
      formData.append("student_id", values.student_id);
      formData.append(
        "agency_id",
        values.agency_id || singleCartificate?.data?.agency_id
      );
      formData.append("completed_hours", values.completed_hours);
      formData.append("grade", values.grade);
      formData.append("course_duration", values.course_duration);
      formData.append("issued_at", format(values.issued_at, "yyyy-MM-dd"));
      formData.append("institute_name", values.institute_name);

      // Append the file if it exists
      if (values.certificate_file) {
        formData.append("certificate_file", values.certificate_file);
      }

      const response = await updateData({
        id,
        data: formData,
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        router.push("/dashboard/certificate");
      } else {
        toast.error(response?.error?.message || "Update failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(
        error?.data?.error?.message || "Something went wrong. Please try again"
      );
    }
  }

  if (isCertificateLoading) {
    return <div>Loading certificate data...</div>;
  }

  return (
    <Card className="container mx-auto shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6 sticky top-0 bg-white/80 dark:bg-gray-800/80 z-10">
        <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Edit Academic Certificate
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-300">
          Update the certificate information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                Personal Information
              </h3>

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick a date"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear() + 10}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  defaultValue={singleCartificate?.data?.gender}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Father and Mother Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="father_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter father's full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mother_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother&apos;s Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter mother's full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                Academic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Agency */}
                <FormField
                  control={form.control}
                  name="agency_id"
                  render={({ field }) => {
                    const defaultAgency = allMyAgency?.find(
                      (agency: any) =>
                        agency.value === singleCartificate?.data?.agency_id
                    );

                    return (
                      <FormItem>
                        <FormLabel>Agency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={singleCartificate?.data?.agency_id}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  defaultAgency?.name || "Select agency"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allMyAgency?.map(
                              (agency: { name: string; value: string }) => (
                                <SelectItem
                                  key={agency.value}
                                  value={agency.value}
                                >
                                  {agency.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="completed_hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completed Hours</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter completed credit hours"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter course duration (e.g., 4 years)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Certificate Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                Certificate Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                {/* Issue Date */}
                <FormField
                  control={form.control}
                  name="issued_at"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Issue Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick issue date"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // Fixed: Disable future dates
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            captionLayout="dropdown"
                            fromYear={1900}
                            toYear={new Date().getFullYear() + 10} // Only show up to current year
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter institute Grade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* File Upload */}
              <FormField
                control={form.control}
                name="certificate_file"
                render={() => (
                  <FormItem>
                    <FormLabel>Certificate File (PDF or Image)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          id="certificate-upload"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="certificate-upload"
                          className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <UploadIcon className="h-8 w-8 text-gray-500" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Click to upload certificate file
                            </p>
                            {selectedFile ? (
                              <p className="text-sm text-green-600 mt-2">
                                {selectedFile.name} selected
                              </p>
                            ) : (
                              <p className="text-xs text-gray-500 mt-2">
                                PDF, JPG, or PNG (max 5MB)
                              </p>
                            )}
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sticky bottom-0 bg-white/80 dark:bg-gray-800/80 pb-4 pt-2">
              <Button
                type="submit"
                className="w-full font-semibold py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Certificate"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
