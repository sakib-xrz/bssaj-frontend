"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Define the validation schema using Zod
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  eligibility: z.string().min(1, {
    message: "Eligibility is required.",
  }),
  provider: z.string().min(1, {
    message: "Provider is required.",
  }),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
  deadline: z.date().refine((date) => !!date, {
    message: "A deadline is required.",
  }),
  application_url: z.string().url({
    message: "Invalid URL format.",
  }),
});

export default function ScholarshipPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      eligibility: "",
      provider: "",
      amount: "",
      application_url: "",
      deadline: undefined,
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log("Submitting form with data:", values);

      toast.success("Scholarship application submitted successfully!");
      form.reset(); // Reset form on success
    } catch (error) {
      console.error("Failed to submit scholarship:", error);
      toast.error("Failed to submit scholarship. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Improved Header Section */}
      <div className="relative bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/header-bg.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 drop-shadow-lg">
            Apply for a Scholarship
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Share scholarship opportunities and help students achieve their
            dreams. Submit details below!
          </p>
        </div>
      </div>

      <Container className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-md">
            <CardContent className="p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Scholarship Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Japanese Government Scholarship"
                            className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Provider */}
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Provider
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., MEXT, JASSO, etc."
                            className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., ¥150,000 per month"
                            className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Deadline */}
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Deadline
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full rounded-lg pl-3 text-left font-normal border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description (full width) */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a detailed description of the scholarship."
                            className="resize-y rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Eligibility (full width) */}
                  <FormField
                    control={form.control}
                    name="eligibility"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="font-semibold">
                          Eligibility
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Must be a Bangladeshi citizen, enrolled in a STEM major, etc."
                            className="resize-y rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Application URL (full width) */}
                  <FormField
                    control={form.control}
                    name="application_url"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="font-semibold">
                          Application URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/apply"
                            className="rounded-lg border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button (full width) */}
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:from-blue-600 hover:to-primary text-white font-semibold py-3 rounded-lg shadow-lg transition"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Scholarship"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
