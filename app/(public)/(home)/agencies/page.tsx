"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Agency as AgencyType } from "@/lib/types";
import { useGetAllAgencyQuery } from "@/redux/features/agency/agencyApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Agency from "../../_components/Agency";

const MemberAgencies = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(9); // initial 9
  const [page, setPage] = useState(1);

  const queryItems = [
    { name: "search", value: search || "" },
    { name: "status", value: "APPROVED" },
    { name: "limit", value: !isNaN(limit) ? limit : 9 },
    { name: "page", value: !isNaN(page) ? page : 1 },
  ];

  const { isLoading, isError, data } = useGetAllAgencyQuery(queryItems);

  // Increase limit on button click
  const loadMore = () => setLimit((prev) => prev + 9); // increase 9 at a time

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="Member Agencies"
          description="Explore our network of member agencies supporting Bangladeshi students in Japan."
        />
      </div>

      <div className="flex justify-center gap-4 w-full mb-8 mt-6 max-w-6xl mx-auto px-4">
        <div className="relative w-full sm:w-2/3">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Agencies"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Container className="py-12 md:py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
            {[...Array(limit)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-6">
              {data?.data?.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    No agencies found matching your search
                  </p>
                </div>
              ) : (
                data?.data?.map((item: AgencyType) => (
                  <Agency key={item?.id} agency={item} />
                ))
              )}
            </div>

            {/* Load More Button */}
            {data?.data?.length >= limit && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default MemberAgencies;
