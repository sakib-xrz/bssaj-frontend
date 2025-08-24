"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";

import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/lib/types";
import { useGetAllEventQuery } from "@/redux/features/event/eventApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { CustomPagination } from "../../_components/CustomPagination";
import Error from "../../_components/error";
import EventCard from "../../_components/EventCard";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(9);
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useGetAllEventQuery([
    { name: "search", value: searchTerm },
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);

  if (isError) {
    return (
      <Error error="This might be a temporary issue. You can try refreshing the page or come back later." />
    );
  }

  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Events"
          description="Join us for exciting events, workshops, and activities designed to support and connect the Bangladeshi student community in Japan."
        />
        <div className="relative w-full text-center mx-auto lg:w-1/2 mt-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Events"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => {
              setPage(1); // reset page on search
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Content Section with min-height */}
      <div className="flex-grow">
        <Container className="py-12 md:py-16">
          {isLoading ? (
            <>
              <div className="mb-8 space-y-4">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-4 w-96 mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <SectionHeader
                className="mb-8"
                title={
                  data?.data?.length ? "Our Upcoming Events" : "No Events Found"
                }
                description={
                  data?.data?.length
                    ? "Join us for these exciting upcoming events and activities."
                    : "There are currently no events matching your search. Please try different keywords."
                }
              />

              {data?.data?.length ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
                    {data.data.map((item: Event) => (
                      <EventCard event={item} key={item.id} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <CustomPagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                      className="mb-10"
                    />
                  )}
                </>
              ) : (
                <div className="min-h-[300px] flex items-center justify-center">
                  <p className="text-gray-500 text-lg">
                    No events match your search criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default EventsPage;
