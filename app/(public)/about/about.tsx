"use client";

import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("mission-vision");

  const tabItems = [
    { value: "mission-vision", label: "Mission & Vision" },
    { value: "history", label: "History" },
    { value: "executive-committee", label: "Executive Committee" },
    { value: "executive-members", label: "Executive Members" },
    { value: "advisory-members", label: "Advisory Members" },
    { value: "associated-members", label: "Associated Members" },
    { value: "honorable-members", label: "Honorable Members" },
  ];

  function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="About BSSAJ"
          description="The Bangladeshi Students’ Support Association in Japan (BSSAJ) is a non-profit, non-political, and student-focused organization established to assist Bangladeshi students studying and aspiring to study in Japan."
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

          {/* Mission & Vision */}
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
                      special courses.
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

          {/* History */}
          <TabsContent value="history" className="mt-8">
            <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 text-gray-700">
              <CardContent className="p-0 space-y-4 text-justify">
                <h2 className="text-2xl font-bold mb-4">History</h2>
                <p>
                  The Bangladeshi Students’ Support Association in Japan (BSSAJ)
                  is a non-profit, non-political, and student-focused
                  organization established to assist Bangladeshi students
                  studying and aspiring to study in Japan. Founded in 2025,
                  BSSAJ is committed to providing educational, administrative,
                  and cultural support to ensure a safer and more enriching
                  academic journey for students. The association actively
                  collaborates with educational institutions, government
                  agencies, and cultural bodies in both Bangladesh and Japan to
                  promote fairness, guidance, and opportunity. BSSAJ also
                  supports its member agencies and institutions by facilitating
                  orientation programs, legal aid, and cultural training to
                  bridge the gap between students and society in Japan.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {tabItems
            .filter(
              (item) =>
                item.value !== "mission-vision" && item.value !== "history"
            )
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
