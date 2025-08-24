"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileStackIcon,
  FileTextIcon,
  GraduationCapIcon,
  HomeIcon,
  MessageSquareIcon,
  PhoneCallIcon,
  SearchIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface SupportOptionProps {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  link?: string;
  contactInfo?: string;
}

const supportOptions: SupportOptionProps[] = [
  {
    id: "live-chat",
    icon: MessageSquareIcon,
    title: "Live Chat",
    description: "Get instant help from our support team",
    link: "#",
  },
  {
    id: "phone-support",
    icon: PhoneCallIcon,
    title: "Phone Support",
    description: "Call us for urgent matters",
    contactInfo: "+880 0194455662",
  },
  {
    id: "submit-ticket",
    icon: FileTextIcon,
    title: "Submit Ticket",
    description: "Create a support ticket for detailed help",
    link: "#",
  },
  {
    id: "video-call",
    icon: VideoIcon,
    title: "Video Call",
    description: "Schedule a video consultation",
    link: "#",
  },
];

interface CategoryCardProps {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  articleCount: number;
  link?: string;
}

const categories: CategoryCardProps[] = [
  {
    id: "academic-support",
    icon: GraduationCapIcon,
    title: "Academic Support",
    description:
      "Help with university applications, course selection, and academic guidance",
    articleCount: 24,
    link: "#",
  },
  {
    id: "visa-immigration",
    icon: FileStackIcon,
    title: "Visa & Immigration",
    description:
      "Help with university applications, course selection, and academic guidance",
    articleCount: 24,
    link: "#",
  },
  {
    id: "accommodation",
    icon: HomeIcon,
    title: "Accommodation",
    description:
      "Help with university applications, course selection, and academic guidance",
    articleCount: 24,
    link: "#",
  },
  {
    id: "employment",
    icon: BriefcaseIcon,
    title: "Employment",
    description:
      "Help with university applications, course selection, and academic guidance",
    articleCount: 24,
    link: "#",
  },
  {
    id: "financial-support",
    icon: DollarSignIcon,
    title: "Financial Support",
    description:
      "Help with university applications, course selection, and academic guidance",
    articleCount: 24,
    link: "#",
  },
  {
    id: "community",
    icon: UsersIcon,
    title: "Community",
    description:
      "Help with university applications, course selection, and academic guidance",
    articleCount: 24,
    link: "#",
  },
];

const Helpdesk: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Helpdesk"
          description="Get the support you need. Search our knowledge base, submit a ticket, or contact our support team."
        />

        <div className="w-full max-w-xl mx-auto relative mt-8 px-4">
          <SearchIcon className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Agencies"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportOptions.map((option) => (
            <Card
              key={option.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="bg-[#DBEAFE] rounded-full p-3 mb-4">
                <option.icon className="h-8 w-8 text-primary" />
              </div>

              <CardTitle className="text-base font-semibold text-gray-900 mb-1">
                {option.title}
              </CardTitle>

              <CardDescription className="text-sm text-muted-foreground mb-4 px-2 leading-relaxed">
                {option.description}
              </CardDescription>

              {option.contactInfo ? (
                <p className="text-sm font-medium text-primary mt-auto">
                  {option.contactInfo}
                </p>
              ) : option.link ? (
                <Button
                  asChild
                  variant="link"
                  className="text-sm text-primary font-medium mt-auto p-0 h-auto"
                >
                  <Link href={option.link}>
                    {{
                      "Live Chat": "Start Chat",
                      "Submit Ticket": "Create Ticket",
                      "Video Call": "Schedule Call",
                    }[option.title] ?? "Learn More"}
                  </Link>
                </Button>
              ) : null}
            </Card>
          ))}
        </div>

        <SectionHeader
          className="mb-8"
          title="Browse by Category"
          description="Find help articles and resources organized by topic"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#DBEAFE] rounded-full p-2">
                  <category.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900 mb-1">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto pt-2 border-t border-gray-100">
                <p>{category.articleCount} articles</p>
                <ChevronRightIcon className="h-4 w-4 text-gray-500" />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Helpdesk;
