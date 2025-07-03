"use client"; // This component requires client-side interactivity for tabs and state

import React, { useState } from "react"; // Import useState
import Image from "next/image";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AboutBSSAJ: React.FC = () => {
  // State to control the active tab, synchronized with the Select dropdown
  const [activeTab, setActiveTab] = useState("mission-vision");

  const tabItems = [
    { value: "mission-vision", label: "Mission & Vision" },
    { value: "history", label: "History" },
    { value: "executive-committee", label: "Executive Committee" },
    { value: "executive-members", label: "Executive Members" },
    { value: "advisory-members", label: "Advisory Members" },
    { value: "associated-members", label: "Associated Members" },
    { value: "honorable-members", label: "Honorable Members" },
    // { value: "student-representatives", label: "Student Representatives" }, // Removed as per previous code, add back if needed
  ];

  function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="About BSSAJ"
          description="Learn about our organization, mission, vision, and the people who make it all possible."
        />
      </div>
      <Container className="py-12 md:py-16 lg:mb-28 ">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="hidden sm:block overflow-x-auto pb-4">
            <TabsList className="flex flex-wrap gap-2 shadow-none bg-transparent">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className={cn(
                    "px-4 text-sm font-medium rounded-full transition-colors duration-200",
                    "data-[state=active]:bg-primary data-[state=active]:text-white",
                    "hover:bg-blue-100 whitespace-nowrap"
                  )}
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="sm:hidden w-full flex justify-end mb-6">
            {" "}
            {/* Removed md:hidden as it's redundant with sm:hidden */}
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-[250px] rounded-full border-gray-300 shadow-sm text-base">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {tabItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="mission-vision" className="mt-8">
            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8">
              <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Our Vision
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      BSSAJ has set out to create a responsible and organized
                      network to ensure a safe, transparent and supportive
                      environment for linguistic, administrative and moral
                      support for Bangladeshi students studying and aspiring to
                      study in Japan. BSSAJ makes every effort to create quality
                      students by training all teachers and students of all
                      members of the organization about Japanese culture through
                      special courses. BSSAJ has set out to create a responsible
                      and organized network to ensure a safe, transparent and
                      supportive environment for linguistic, administrative and
                      moral support for Bangladeshi students studying and
                      aspiring to study in Japan. BSSAJ makes every effort to
                      create quality students by training all teachers and
                      students of all members of the organization about Japanese
                      culture through special courses. Turn on screen reader
                      support To enable screen reader support, press Ctrl+Alt+Z
                      To learn about keyboard shortcuts, press Ctrl+slash
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Our Values
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-justify">
                      <li>Community and Support</li>
                      <li>Academic Excellence</li>
                      <li>Cultural Exchange</li>
                      <li>Professional Development</li>
                      <li>Integrity and Transparency</li>
                    </ul>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    src="/images/about-mission.png"
                    alt="Mission Vision Values Graphic"
                    width={500}
                    height={500}
                    className="w-full h-auto max-w-md object-contain"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {tabItems
            .filter((item) => item.value !== "mission-vision")
            .map((item) => (
              <TabsContent key={item.value} value={item.value} className="mt-8">
                <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 text-center text-gray-600">
                  <CardContent className="p-0">
                    <h2 className="text-2xl font-bold mb-4">{item.label}</h2>
                    <p>Content for {item.label} goes here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default AboutBSSAJ;
