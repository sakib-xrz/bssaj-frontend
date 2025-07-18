"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SearchIcon, CalendarDaysIcon } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";

interface Article {
  title: string;
  date: string;
  description: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    title: "Guide to Student Life in Japan",
    date: "May 15, 2024",
    description:
      "Essential tips for Bangladeshi students adjusting to life in Japan. Essential tips for Bangladeshi students adjusting to life in Japan.....",
    featured: true,
  },
  {
    title: "Scholarship Opportunities for 2024",
    date: "May 15, 2024",
    description:
      "A comprehensive list of scholarships available for Bangladeshi students. A comprehensive list of scholarships available for Bangladeshi students.....",
    featured: true,
  },
  {
    title: "Understanding the Japanese Work Culture",
    date: "May 15, 2024",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace norms and expectations.....",
    featured: false,
  },
  {
    title: "Guide to Student Life in Japan",
    date: "May 15, 2024",
    description:
      "Essential tips for Bangladeshi students adjusting to life in Japan. Essential tips for Bangladeshi students adjusting to life in Japan.....",
    featured: false,
  },
  {
    title: "Scholarship Opportunities for 2024",
    date: "May 15, 2024",
    description:
      "A comprehensive list of scholarships available for Bangladeshi students. A comprehensive list of scholarships available for Bangladeshi students.....",
    featured: false,
  },
  {
    title: "Understanding the Japanese Work Culture",
    date: "May 15, 2024",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace norms and expectations.....",
    featured: false,
  },
];

const News: React.FC = () => {
  const articlesLeft = articles.slice(0, articles.length / 2);
  const articlesRight = articles.slice(articles.length / 2);
  const [searchTerm, setSearchTerm] = useState("");

  const [emailSubscription, setEmailSubscription] = useState("");

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscription email:", emailSubscription);
    alert("Thank you for subscribing!");
    setEmailSubscription("");
  };
  const featuredNews = useMemo(
    () => articles.filter((article) => article.featured),
    []
  );

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="News"
          description="Stay updated with the latest news, events, and stories from the Bangladeshi Student Support Association Japan"
        />

        <div className="w-full max-w-xl mx-auto relative mt-8 px-4">
          <SearchIcon className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Agencies"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Container className="py-12 md:py-16">
        <SectionHeader
          className="mb-8 center mt-10"
          title="Featured News"
          description="Highlighted updates and stories for the BSSAJ community"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {featuredNews.map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02] border border-gray-200 bg-white"
            >
              <div className="h-48 bg-gradient-to-r from-[#E6F0FF] to-[#B3D7FF] flex items-center justify-center text-white font-bold text-xl">
                <Image
                  src="/images/newsImg3.avif"
                  alt="News Thumbnail"
                  width={350}
                  height={350}
                  className="object-cover w-full h-full"
                />
              </div>

              <CardContent className="p-6 flex flex-col">
                <CardTitle className="text-2xl font-semibold text-primary mb-2 leading-snug">
                  {article.title}
                </CardTitle>
                <CardDescription className="flex items-center text-sm text-gray-500 mb-3">
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
                  {article.date}
                </CardDescription>
                <p className="text-base text-gray-700 mb-4 flex-grow">
                  {article.description}
                </p>
                <Button
                  variant="outline"
                  className="self-start mt-auto text-sm font-medium px-4 py-2 border-primary text-primary hover:bg-primary/10"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <SectionHeader
          className="mb-8 text-center"
          title="Recent blog & Updates"
          description=" Explore the latest articles and updates from BSSAJ"
        />

        <Card className="w-full rounded-xl shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-y-0">
              {/* Left Column */}
              <div className="flex flex-col pr-3 md:pr-6">
                {articlesLeft.map((article, index) => (
                  <div key={`left-${index}`}>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                      {article.title}
                    </h3>
                    <p className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                      <CalendarDaysIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      {article.date}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {article.description}
                    </p>
                    {index < articlesLeft.length - 1 && (
                      <hr className="my-2 md:my-4 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Vertical Divider */}
              <div className="hidden md:flex justify-center">
                <div className="w-px bg-gray-200 h-full" />
              </div>

              {/* Right Column */}
              <div className="flex flex-col pl-3 md:pl-6">
                {articlesRight.map((article, index) => (
                  <div key={`right-${index}`}>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                      {article.title}
                    </h3>
                    <p className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                      <CalendarDaysIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      {article.date}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {article.description}
                    </p>
                    {index < articlesRight.length - 1 && (
                      <hr className="my-2 md:my-4 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-center mb-12 mt-8">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md">
            Load More Blogs
          </Button>
        </div>
      </Container>

      <div className="bg-[#F0F0F0] py-12">
        <SectionHeader
          className="mb-8"
          title="Stay Updated"
          description="Subscribe to our newsletter to receive the latest news and updates from BSSAJ"
        />
        <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 px-4">
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base"
            value={emailSubscription}
            onChange={(e) => setEmailSubscription(e.target.value)}
          />
          <Button
            onClick={handleSubscriptionSubmit}
            className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md flex-shrink-0"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default News;
