"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/lib/types";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import BlogCard from "../../_components/blog-card";
import { CustomPagination } from "../../_components/CustomPagination";
import Error from "../../_components/error";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const { isLoading, isError, data } = useGetAllBlogsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "search", value: searchTerm },
    { name: "is_approved", value: true },
  ]);

  if (isError) {
    return <Error error="Something went wrong" />;
  }

  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

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
            placeholder="Search Blogs"
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {data?.data?.map((item: Blog) => (
              <BlogCard key={item.id} blog={item} />
            ))}
          </div>
        )}
      </Container>
      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mb-10"
      />
    </div>
  );
};

export default BlogPage;
