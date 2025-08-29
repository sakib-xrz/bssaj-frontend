"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/shared/section-header";
import Misstion from "./_Misstion";
import Executive from "./_Executive";
import Advisor from "./_Advisor";
import Associate from "./_Associate";
import Honorable from "./_Honorable";
import Student_Representative from "./_Student_Representative";
import Committee from "./_Committee";

const Page = () => {
  const tabItems = [
    {
      value: "mission-vision",
      label: "Mission & Vision",
      content: <Misstion />,
    },
    {
      value: "committee",
      label: "Committee",
      content: <Committee />,
    },
    {
      value: "executive",
      label: "Executive",
      content: <Executive />,
    },
    {
      value: "adviser",
      label: "Advisor",
      content: <Advisor />,
    },
    {
      value: "associate",
      label: "Associate",
      content: <Associate />,
    },
    {
      value: "honorable",
      label: "Honorable",
      content: <Honorable />,
    },
    {
      value: "student-representative",
      label: "Student Representative",
      content: <Student_Representative />,
    },
  ];

  const [activeTab, setActiveTab] = useState("mission-vision");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-10 sm:py-20 flex-shrink-0">
        <SectionHeader
          title="About BSSAJ"
          description="The Bangladeshi Students’ Support Association in Japan (BSSAJ) is a non-profit, non-political, and student-focused organization established to assist Bangladeshi students studying and aspiring to study in Japan."
        />
      </div>

      {/* Buttons as Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tabItems.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-md font-medium transition-colors border ${
              activeTab === tab.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {tabItems.map(
          (tab) =>
            activeTab === tab.value && (
              <div key={tab.value} className="mt-6 sm:mt-8">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Page;
