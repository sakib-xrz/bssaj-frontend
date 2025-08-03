"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Event } from "@/lib/types";
import { useGetAllEventQuery } from "@/redux/features/event/eventApi";
import { useState } from "react";
import Error from "./error";
import EventCard from "./EventCard";
import Loading from "./loading";


const EventsPage = () => {
  const [limit] = useState(6);

  const { isLoading, isError, data } = useGetAllEventQuery([
    { name: "limit", value: limit },
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

  return (
    <div>
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

      </Container>
    </div>
  );
};

export default EventsPage;
