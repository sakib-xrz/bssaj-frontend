/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useGetMyAgenciesQuery } from "@/redux/features/agency/agencyApi"
import { useCreateCertificateMutation } from "@/redux/features/certificate/certificateApi"
import { toast } from "sonner"

interface FormValues {
  name: string
  date_of_birth: Date | undefined
  gender: string
  father_name: string
  mother_name: string
  student_id: string
  agency_id: string
  completed_hours: string
  grade: string
  course_duration: string
  issued_at: Date | undefined
  institute_name: string
}

const defaultFormValues: FormValues = {
  name: "",
  father_name: "",
  mother_name: "",
  student_id: "",
  agency_id: "",
  completed_hours: "",
  grade: "",
  course_duration: "",
  institute_name: "",
  date_of_birth: undefined,
  issued_at: undefined,
  gender: "",
}

export function StudentCertificateForm() {
  const { data } = useGetMyAgenciesQuery(undefined)
  const [sendFormData, { isLoading, isError }] = useCreateCertificateMutation(undefined)
  console.log(isError)
  const form = useForm<FormValues>({
    defaultValues: defaultFormValues,
  })

  const allMyAgency = data?.data?.map((item: { name: string; id: string }) => ({
    name: item.name,
    value: item.id,
  }))

  async function onSubmit(values: FormValues) {
    console.log("Form Submitted with values:", values)

    if (!values.date_of_birth || !values.issued_at) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      const formattedData = {
        ...values,
        date_of_birth: format(values.date_of_birth, "yyyy-MM-dd"),
        issued_at: format(values.issued_at, "yyyy-MM-dd"),
      }
      console.log("Formatted Data:", formattedData)

      const info = await sendFormData(formattedData).unwrap()
      if (info.success) {
        toast.success(info.message)
      } else {
        toast.error(info?.error?.message)
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      toast.error("Something went wrong. Please try again")
    }
  }

  return (
    <Card className="w-full shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-6 sticky top-0 bg-white/80 dark:bg-gray-800/80 z-10">
        <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Academic Certificate Information
        </CardTitle>
        <CardDescription className="text-center text-gray-600 dark:text-gray-300">
          Please fill in all required information accurately
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="max-w-full truncate overflow-hidden whitespace-nowrap">
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
                      <FormLabel>Fathers Name</FormLabel>
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
                      <FormLabel>Mothers Name</FormLabel>
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

                {/* Agency Select */}
                <FormField
                  control={form.control}
                  name="agency_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="max-w-full truncate overflow-hidden whitespace-nowrap">
                            <SelectValue placeholder="Select agency" />
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
                  )}
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
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
                        <Input
                          placeholder="Enter institute grade"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white/80 dark:bg-gray-800/80 pb-4 pt-2">
              <Button
                type="submit"
                className="w-full font-semibold py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Generate Certificate"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}