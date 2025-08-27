"use client";

import { useGetAllJobsQuery } from "@/redux/features/jobs/jobApi";
import React, { useState, useEffect } from "react";
import { JobCard } from "../../_components/job-card";
import { Button } from "@/components/ui/button";
import { Jobs } from "@/lib/types";
import SectionHeader from "@/components/shared/section-header";
import { CustomPagination } from "../../_components/CustomPagination";
import { Input } from "@/components/ui/input";

function Page() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { isLoading, isError, data } = useGetAllJobsQuery([
    { name: "search", value: debouncedSearch },
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "is_approved", value: true },
  ]);

  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  return (
    <>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="Find Job"
          description="Find Career opportunities and job Openings from the Bangladesh Student Support Association Japan"
        />
      </div>

      <div className="max-w-4xl py-10 mx-auto px-4 mb-8">
        <Input
          placeholder="Search Jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-semibold text-foreground mb-8">
          Recent Jobs & Openings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading
            ? Array.from({ length: limit }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-40 bg-gray-200 animate-pulse rounded-md"
                />
              ))
            : data?.data.map((job: Jobs) => <JobCard key={job.id} job={job} />)}
        </div>

        {totalPages > 1 && (
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mb-10"
          />
        )}
      </div>
    </>
  );
}

export default Page;
