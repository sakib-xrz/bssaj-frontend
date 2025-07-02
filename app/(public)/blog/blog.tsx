"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SearchIcon } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

interface BlogPostProps {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  timeAgo: string;
  category?: string;
  featured?: boolean;
}

const allBlogPosts: BlogPostProps[] = [
  {
    id: "1",
    imageSrc: "/images/blog-1.png",
    title: "Navigating Student Life in Japan: A Guide for Bangladeshi Students",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace",
    authorName: "Nabila Nusrat Nila",
    authorImage: "/images/author-1.jpg",
    timeAgo: "2h ago",
    category: "Scholarships",
    featured: true,
  },
  {
    id: "2",
    imageSrc: "/images/blog-2.png",
    title: "Scholarships & Financial Aid for Bangladeshi Students in Japan",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace",
    authorName: "Satō Akari",
    authorImage: "/images/author-2.jpg",
    timeAgo: "Yesterday",
    category: "Community",
    featured: true,
  },
  {
    id: "3",
    imageSrc: "/images/blog-2.png",
    title: "Visa Renewal & Part-Time Work Rules Every Student Should Know",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace",
    authorName: "Nabila Nusrat Nila",
    authorImage: "/images/author-1.jpg",
    timeAgo: "Today",
    category: "Visa Guide",
    featured: true,
  },
  {
    id: "4",
    imageSrc: "/images/blog-1.png",
    title: "Japanese Language Proficiency Test (JLPT) Prep Tips",
    description:
      "Mastering the JLPT is crucial for students. Here are some tips and resources to help you prepare effectively...",
    authorName: "Dr. Kenji Tanaka",
    authorImage: "/images/author-2.jpg",
    timeAgo: "3 days ago",
    category: "Education",
    featured: false,
  },
  {
    id: "5",
    imageSrc: "/images/blog-1.png",
    title: "Cultural Immersion: Experiencing Japan Beyond Textbooks",
    description:
      "Dive deep into Japanese traditions and daily life. From tea ceremonies to local festivals, enrich your student journey...",
    authorName: "Nabila Nusrat Nila",
    authorImage: "/images/author-1.jpg",
    timeAgo: "1 week ago",
    category: "Culture",
    featured: false,
  },
  {
    id: "6",
    imageSrc: "/images/blog-2.png",
    title: "Networking in Japan: Building Professional Connections",
    description:
      "Tips for international students to effectively network in the Japanese professional landscape. Discover opportunities...",
    authorName: "Satō Akari",
    authorImage: "/images/author-2.jpg",
    timeAgo: "2 weeks ago",
    category: "Career",
    featured: false,
  },
  {
    id: "7",
    imageSrc: "/images/blog-2.png",
    title: "Exploring Japanese Cuisine: A Student's Guide",
    description:
      "A culinary journey through Japan for students on a budget. Discover delicious and affordable local dishes...",
    authorName: "Hiroshi Sato",
    authorImage: "/images/author-2.jpg",
    timeAgo: "3 weeks ago",
    category: "Lifestyle",
    featured: false,
  },
  {
    id: "8",
    imageSrc: "/images/blog-1.png",
    title: "Student Accommodation in Tokyo: What You Need to Know",
    description:
      "Finding the perfect place to live in Tokyo can be challenging. Here's a guide to student housing options...",
    authorName: "Emily Chen",
    authorImage: "/images/author-1.jpg",
    timeAgo: "1 month ago",
    category: "Accommodation",
    featured: false,
  },
];

const ITEMS_PER_LOAD = 4;

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [emailSubscription, setEmailSubscription] = useState("");
  const [loadCount, setLoadCount] = useState(ITEMS_PER_LOAD);

  const featuredPosts = useMemo(
    () => allBlogPosts.filter((post) => post.featured),
    []
  );

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscription email:", emailSubscription);
    alert("Thank you for subscribing!");
    setEmailSubscription("");
  };

  const filteredRecentPosts = useMemo(() => {
    let currentPosts = allBlogPosts.filter((post) => !post.featured);

    if (searchTerm) {
      currentPosts = currentPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.category &&
            post.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return currentPosts;
  }, [searchTerm]);

  const visibleRecentPosts = useMemo(() => {
    return filteredRecentPosts.slice(0, loadCount);
  }, [filteredRecentPosts, loadCount]);

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Blog"
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
          className="mb-8 text-left"
          title="Featured Blog"
          description=""
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="rounded-xl shadow-lg border border-gray-200 bg-white p-4 flex flex-col"
            >
              <div className="relative w-full aspect-[16/10] flex-shrink-0">
                <Image
                  src={post.imageSrc}
                  alt={post.title}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {post.category && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>
              <CardContent className="p-0 pt-4 flex flex-col flex-grow">
                <CardTitle className="text-xl font-semibold text-primary mb-2 leading-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-4 flex-grow">
                  {post.description}
                </CardDescription>
                <div className="flex items-center mt-auto">
                  <Image
                    src={post.authorImage}
                    alt={post.authorName}
                    width={40}
                    height={40}
                    className="rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {post.authorName}
                    </p>
                    <p className="text-xs text-gray-500">{post.timeAgo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <SectionHeader
          className="mb-8 text-left"
          title="Recent Blog & Updates"
          description=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {visibleRecentPosts.length > 0 ? (
            visibleRecentPosts.map((post) => (
              <Card
                key={post.id}
                className="rounded-xl shadow-lg border border-gray-200 bg-white p-4 flex flex-col"
              >
                <div className="relative w-full aspect-[16/10] flex-shrink-0">
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-0 pt-4 flex flex-col flex-grow">
                  <CardTitle className="text-lg font-semibold text-primary mb-2 leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mb-3 flex-grow">
                    {post.description}
                  </CardDescription>
                  <div className="flex items-center mt-auto">
                    <Image
                      src={post.authorImage}
                      alt={post.authorName}
                      width={30}
                      height={30}
                      className="rounded-full mr-2 object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">
                        {post.authorName}
                      </p>
                      <p className="text-xs text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No recent blog posts found.
            </p>
          )}
        </div>

        {loadCount < filteredRecentPosts.length && (
          <div className="text-center mb-12">
            <Button
              onClick={handleLoadMore}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md"
            >
              Load More Blogs
            </Button>
          </div>
        )}
      </Container>

      {/* Stay Updated Section (Subscription Form) */}
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

export default BlogPage;
