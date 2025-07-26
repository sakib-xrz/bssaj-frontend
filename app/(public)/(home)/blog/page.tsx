"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Blog } from "@/lib/types";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { SearchIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import BlogCard from "../../_components/blog-card";

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, isError, data } = useGetAllBlogsQuery([]);

    const filteredBlogs = useMemo(() => {
        if (!data?.data) return [];
        return data.data
            .filter((item: Blog) => item.is_approved)
            .filter((item: Blog) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [data, searchTerm]);

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

                {isLoading && <p className="text-center">Loading...</p>}

                {!isLoading && isError && (
                    <p className="text-red-500 text-center">Something went wrong</p>
                )}

                {!isLoading && !isError && filteredBlogs.length === 0 && (
                    <p className="text-green-500 text-center">No Data Found</p>
                )}

                {!isLoading && !isError && filteredBlogs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {filteredBlogs.map((item: Blog) => (
                            <BlogCard key={item.id} blog={item} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default BlogPage;
