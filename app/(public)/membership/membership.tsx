"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MailIcon, PhoneIcon, UploadIcon } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

const Membership: React.FC = () => {
  const [email, setEmail] = useState("");
  const [directorName, setDirectorName] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [successStoriesFiles, setSuccessStoriesFiles] =
    useState<FileList | null>(null);
  const [downloadsFiles, setDownloadsFiles] = useState<FileList | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const successStoriesInputRef = useRef<HTMLInputElement>(null);
  const downloadsInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("Form submitted!");
    // console.log({
    //   email,
    //   directorName,
    //   logoFile,
    //   successStoriesFiles,
    //   downloadsFiles,
    // });
  };

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

  const renderFileInput = (
    id: string,
    label: string,
    maxFilesInfo: string,
    fileState: File | FileList | null,
    setFileState:
      | React.Dispatch<React.SetStateAction<File | null>>
      | React.Dispatch<React.SetStateAction<FileList | null>>,
    inputRef: React.RefObject<HTMLInputElement>,
    multiple: boolean = false
  ) => (
    <div className="md:col-span-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} *
      </label>
      <div className="flex items-center space-x-2 w-full max-w-md border border-gray-300 rounded-md shadow-sm overflow-hidden">
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-l-md transition-colors duration-200 flex-shrink-0"
        >
          <UploadIcon className="h-4 w-4 mr-2" /> Choose File
          {multiple ? "s" : ""}
        </Button>
        <span className="text-sm text-gray-500 truncate px-2">
          {fileState
            ? multiple
              ? (fileState as FileList).length > 0
                ? Array.from(fileState as FileList)
                    .map((f) => f.name)
                    .join(", ")
                : "No file chosen"
              : (fileState as File).name
            : "No file chosen"}
        </span>
        <input
          type="file"
          id={id}
          ref={inputRef}
          multiple={multiple}
          onChange={(e) => {
            if (multiple) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setFileState(e.target.files as any);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setFileState(e.target.files ? e.target.files[0] : (null as any));
            }
          }}
          className="hidden" // Hide the actual input
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{maxFilesInfo}</p>
    </div>
  );

  return (
    <div>
      <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-white py-20">
        <SectionHeader
          className="mb-20"
          title="Membership"
          description="Join our community and access exclusive benefits and support services."
        />
      </div>
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                Membership Application
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                Complete the form below to apply for BSSAJ membership. Please
                ensure all information is accurate and up-to-date.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm text-gray-600">
                  Please provide your agencies details for the membership
                  application:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Your Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="directorName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Director Name *
                    </label>
                    <Input
                      type="text"
                      id="directorName"
                      placeholder="Your Answer"
                      required
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instituteName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Institute Name *
                    </label>
                    <Input
                      type="text"
                      id="instituteName"
                      placeholder="Your Answer"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="establishmentYear"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Establishment year *
                    </label>
                    <Input
                      type="text"
                      id="establishmentYear"
                      placeholder="Your Answer"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="aboutInstitute"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      About Your Institute *
                    </label>
                    <Textarea
                      id="aboutInstitute"
                      placeholder="Your Answer"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fullAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Address *
                    </label>
                    <Input
                      type="text"
                      id="fullAddress"
                      placeholder="Your Answer"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Contact Number (only one) *
                    </label>
                    <Input
                      type="tel"
                      id="contactNumber"
                      placeholder="Your Answer"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="messageFromDirector"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message From Director
                    </label>
                    <Input
                      type="text"
                      id="messageFromDirector"
                      placeholder="Your Answer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="servicesOffered"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Services Offered
                    </label>
                    <Input
                      type="text"
                      id="servicesOffered"
                      placeholder="Your Answer"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="facebookPageUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Facebook Page (URL) *
                    </label>
                    <Input
                      type="url"
                      id="facebookPageUrl"
                      placeholder="Your Answer"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="websiteUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Website URL(If have)
                    </label>
                    <Input
                      type="url"
                      id="websiteUrl"
                      placeholder="Your Answer"
                    />
                  </div>

                  {renderFileInput(
                    "logo",
                    "Logo",
                    "Upload 1 supported file. Max 10 MB",
                    logoFile,
                    setLogoFile,
                    logoInputRef
                  )}
                  {renderFileInput(
                    "successStories",
                    "Success Stories (5 photos only)",
                    "Upload up to 5 supported files. Max 100 MB per file.",
                    successStoriesFiles,
                    setSuccessStoriesFiles,
                    successStoriesInputRef,
                    true // multiple files allowed
                  )}
                  {renderFileInput(
                    "downloads",
                    "Downloads (Admission Form, etc.)",
                    "Upload up to 5 supported files. PDF, document, or image. Max 100 MB per file.",
                    downloadsFiles,
                    setDownloadsFiles,
                    downloadsInputRef,
                    true
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md"
                >
                  Save changed
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex flex-col space-y-8">
            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary">
                  Membership FAQs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium text-gray-800 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-primary">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have any questions or need assistance with your
                  application, we are here to help.
                </p>
                <div className="flex items-center space-x-3 text-gray-700">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-base font-medium">Call Us</p>
                    <p className="text-sm">000 XXXXXXXX</p>
                    <p className="text-xs text-gray-500">
                      Monday to Friday, 9:00 AM - 5:00 PM JST
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MailIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-base font-medium">Email Us</p>
                    <p className="text-sm">membership@bssaj.com</p>
                    <p className="text-xs text-gray-500">
                      We will respond within 24 hours
                    </p>
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
