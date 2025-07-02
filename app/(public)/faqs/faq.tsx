"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How do I apply for a student visa to Japan?",
    answer:
      "The process involves submitting an application to the Japanese embassy or consulate in your country, along with necessary documents like your admission letter, financial statements, and passport. It is highly recommended to consult the official website of the Japanese Ministry of Foreign Affairs or your local embassy for the most up-to-date requirements.",
  },
  {
    id: "2",
    question: "What scholarships are available for Bangladeshi students?",
    answer:
      "Several scholarships are available, including NEXT Scholarships (Japanese Government), JASSO Scholarships, and various university-specific or private organization scholarships. Eligibility criteria and application procedures vary, so it's best to research thoroughly and apply early.",
  },
  {
    id: "3",
    question: "How can I find part-time work in Japan?",
    answer:
      'International students on a student visa are generally allowed to work up to 28 hours per week during academic terms and up to 40 hours during long breaks. Common part-time jobs include convenience store staff, restaurant staff, and language tutors. You\'ll need to obtain a "Permission to Engage in Activity Other Than That Permitted by the Status of Residence" from immigration.',
  },
  {
    id: "4",
    question: "What are the best areas to live in Tokyo for students?",
    answer:
      "Popular student areas include Shibuya, Shinjuku, Ikebukuro, and areas near major universities. Factors like rent, commute time, and access to amenities should be considered when choosing. Researching local transportation and living costs is essential.",
  },
  {
    id: "5",
    question: "How do I apply for a student visa to Japan?",
    answer:
      "The process involves submitting an application to the Japanese embassy or consulate in your country, along with necessary documents like your admission letter, financial statements, and passport. It is highly recommended to consult the official website of the Japanese Ministry of Foreign Affairs or your local embassy for the most up-to-date requirements.",
  },
  {
    id: "6",
    question: "What scholarships are available for Bangladeshi students?",
    answer:
      "Several scholarships are available, including NEXT Scholarships (Japanese Government), JASSO Scholarships, and various university-specific or private organization scholarships. Eligibility criteria and application procedures vary, so it's best to research thoroughly and apply early.",
  },
  {
    id: "7",
    question: "How can I find part-time work in Japan?",
    answer:
      'International students on a student visa are generally allowed to work up to 28 hours per week during academic terms and up to 40 hours during long breaks. Common part-time jobs include convenience store staff, restaurant staff, and language tutors. You\'ll need to obtain a "Permission to Engage in Activity Other Than That Permitted by the Status of Residence" from immigration.',
  },
  {
    id: "8",
    question: "What are the best areas to live in Tokyo for students?",
    answer:
      "Popular student areas include Shibuya, Shinjuku, Ikebukuro, and areas near major universities. Factors like rent, commute time, and access to amenities should be considered when choosing. Researching local transportation and living costs is essential.",
  },
];

const FAQ: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Quick answers to common questions"
        />
      </div>

      <Container className="py-12 md:py-16">
        <div className="w-full max-w-4xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-left text-lg font-medium text-gray-800 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mb-12">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md">
            View All FAQs
          </Button>
        </div>
      </Container>
      <div className="bg-[#F0F0F0]">
        <SectionHeader
          className="py-12"
          title="Our Support Performance"
          description="We're committed to providing excellent support to our community"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto text-center pb-12">
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">98%</p>
            <p className="text-lg text-gray-700">Customer Satisfaction</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              2.5hrs
            </p>
            <p className="text-lg text-gray-700">Average Response Time</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">1,247</p>
            <p className="text-lg text-gray-700">Tickets Resolved</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">24/7</p>
            <p className="text-lg text-gray-700">Support Availability</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
