"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  FileTextIcon,
  UserIcon,
  ClockIcon,
} from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

interface ConsultationServiceProps {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  duration: string;
  services: string[];
  price?: string;
  link: string;
}

const consultationServices: ConsultationServiceProps[] = [
  {
    id: "academic",
    icon: GraduationCapIcon,
    title: "Academic Consultation",
    description:
      "University applications, course selection, academic planning, and study guidance.",
    duration: "45-60 minutes",
    services: [
      "University selection guidance",
      "Application review",
      "Academic planning",
      "Study tips",
    ],
    price: "Free",
    link: "#",
  },
  {
    id: "career",
    icon: BriefcaseIcon,
    title: "Career Guidance",
    description:
      "University applications, course selection, academic planning, and study guidance.",
    duration: "45-60 minutes",
    services: [
      "University selection guidance",
      "Application review",
      "Academic planning",
      "Study tips",
    ],
    price: "Free",
    link: "#",
  },
  {
    id: "visa",
    icon: FileTextIcon,
    title: "Visa & Immigration",
    description:
      "University applications, course selection, academic planning, and study guidance.",
    duration: "45-60 minutes",
    services: [
      "University selection guidance",
      "Application review",
      "Academic planning",
      "Study tips",
    ],
    price: "Free",
    link: "#",
  },
  {
    id: "personal",
    icon: UserIcon,
    title: "Personal Support",
    description:
      "University applications, course selection, academic planning, and study guidance.",
    duration: "45-60 minutes",
    services: [
      "University selection guidance",
      "Application review",
      "Academic planning",
      "Study tips",
    ],
    price: "Free",
    link: "#",
  },
];

const Consultations: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Consultations"
          description="Get personalized guidance from our expert consultants. Book a free consultation to discuss your academic, career, or personal needs."
        />
        <div className="flex justify-center mt-8">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md flex items-center gap-2 justify-center">
            <CalendarDaysIcon className="h-5 w-5" />
            <span>View Upcoming Events</span>
          </Button>
        </div>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
          {consultationServices.map((service) => (
            <Card
              key={service.id}
              className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 flex flex-col"
            >
              <CardContent className="p-0 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-3 flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 leading-tight">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                  {service.price && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0">
                      {service.price}
                    </span>
                  )}
                </div>

                <CardDescription className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </CardDescription>
                <p className="flex items-center text-sm text-gray-600 mb-4">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {service.duration}
                </p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {service.services.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md mt-auto"
                >
                  <Link href={service.link}>Book {service.title} </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Consultations;
