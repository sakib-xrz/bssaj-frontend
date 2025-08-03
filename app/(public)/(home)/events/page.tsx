"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Event } from "@/lib/types";
import { useGetAllEventQuery } from "@/redux/features/event/eventApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Error from "../../_components/error";
import EventCard from "../../_components/EventCard";
import Loading from "../../_components/loading";

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(6);
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useGetAllEventQuery([
    { name: "search", value: searchTerm },
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <Error error="This might be a temporary issue. You can try refreshing the page or come back later." />
    );
  }

  if (!data?.data?.length) {
    return <Error error="No Data Found" />;
  }

  const totalPages = Math.ceil(data?.meta?.total / limit);

  return (
    <div>
      {/* SEARCH + HERO */}
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Events"
          description="Join us for exciting events, workshops, and activities designed to support and connect the Bangladeshi student community in Japan."
        />
        <div className="relative w-full text-center mx-auto lg:w-1/2 mb-10">
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

      {/* LIST */}
      <Container className="py-12 md:py-16">
        <SectionHeader
          className="mb-8"
          title="Our Upcoming Events"
          description="Join us for these exciting upcoming events and activities."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
          {data?.data?.map((item: Event) => (
            <EventCard event={item} key={item.id} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Container>
    </div>
  );
};

export default EventsPage;
