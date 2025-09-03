/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Agency as AgencyType } from "@/lib/types";
import { useGetAllAgencyQuery } from "@/redux/features/agency/agencyApi";
import { Loader2, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Agency from "../../_components/Agency";

const MemberAgencies = () => {
  const [search, setSearch] = useState("");
  const [sort] = useState("default");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [allAgencies, setAllAgencies] = useState<AgencyType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  const { isLoading, isError, data, isFetching } = useGetAllAgencyQuery([
    { name: "search", value: search },
    { name: "page", value: page.toString() },
    { name: "limit", value: limit.toString() },
    { name: "status", value: "APPROVED" },
  ]);

  useEffect(() => {
    setPage(1);
    setAllAgencies([]);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    if (data?.data) {
      const newAgencies = data.data.filter(
        (item: AgencyType) => item.status === "APPROVED"
      );

      if (page === 1) {
        setAllAgencies(newAgencies);
      } else {
        setAllAgencies((prev) => [...prev, ...newAgencies]);
      }

      setHasMore(newAgencies.length === limit);
    }
  }, [data, page, limit]);

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !isFetching) {
      console.log("🔄 Triggering load more - Page:", page + 1);
      loadMore();
    }
  }, [inView, hasMore, isLoadingMore, isFetching, page]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      console.log("📥 Loading more agencies...");
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoadingMore]);

  useEffect(() => {
    if (data && !isFetching) {
      const timer = setTimeout(() => {
        setIsLoadingMore(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [data, isFetching]);

  const sortedData = [...allAgencies].sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    if (sort === "name-desc") return b.name.localeCompare(a.name);
    return 0; // default
  });

  if (isError)
    return (
      <div className="text-center py-12 text-red-500">
        Error loading agencies. Please try again later.
      </div>
    );

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="Member Agencies"
          description="Explore our network of member agencies supporting Bangladeshi students in Japan."
        />
      </div>

      <div className="flex justify-center gap-4 w-full mb-8 mt-6 max-w-6xl mx-auto px-4">
        {/* Search Input */}
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
        {isLoading && page === 1 ? (
          // Initial loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
            {sortedData?.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No agencies found matching your search
                </p>
              </div>
            ) : (
              sortedData?.map((item: AgencyType) => (
                <Agency key={item?.id} agency={item} />
              ))
            )}
          </div>
        )}

        {/* Load More Section */}
        {hasMore && allAgencies.length > 0 && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center py-12 border-t border-gray-100"
          >
            {isLoadingMore || isFetching ? (
              <div className="flex items-center gap-3 text-gray-600 bg-blue-50 px-8 py-6 rounded-lg border-2 border-blue-200 shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="font-semibold text-lg">
                  Loading more agencies...
                </span>
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center">
                <div className="text-gray-400 text-sm bg-gray-50 px-4 py-2 rounded-full">
                  Scroll down to load more agencies
                </div>
              </div>
            )}
          </div>
        )}

        {/* End of results message */}
        {!hasMore && allAgencies.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>You&apos;ve reached the end of all approved agencies.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MemberAgencies;
