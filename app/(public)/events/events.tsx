/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  SearchIcon,
  MapPinIcon,
  CalendarDaysIcon,
  UsersIcon,
  GraduationCapIcon,
  SparklesIcon,
  GlobeIcon,
  LaptopIcon,
  Users,
} from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
}

const upcomingEvents: EventCardProps[] = [
  {
    title: "Annual Cultural Festival",
    date: "May 15, 2024",
    location: "Tokyo International Forum",
  },
  {
    title: "Scholarship Information Session",
    date: "May 15, 2024",
    location: "Online Webinar",
  },
  {
    title: "Career Fair For International Student",
    date: "May 15, 2024",
    location: "Yokohama Convention Center",
  },
  {
    title: "Annual Cultural Festival",
    date: "May 15, 2024",
    location: "Tokyo International Forum",
  },
  {
    title: "Scholarship Information Session",
    date: "May 15, 2024",
    location: "Online Webinar",
  },
  {
    title: "Career Fair For International Student",
    date: "May 15, 2024",
    location: "Yokohama Convention Center",
  },
];

interface EventCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  count: number;
}

const eventCategories: EventCategory[] = [
  { id: "all", name: "All Events", icon: SparklesIcon, count: 15 },
  { id: "academic", name: "Academic", icon: GraduationCapIcon, count: 15 },
  { id: "career", name: "Career", icon: UsersIcon, count: 15 },
  { id: "cultural", name: "Cultural", icon: GlobeIcon, count: 15 },
  { id: "social", name: "Social", icon: UsersIcon, count: 15 },
  { id: "online", name: "Online", icon: LaptopIcon, count: 15 },
];

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [emailSubscription, setEmailSubscription] = useState("");

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscription email:", emailSubscription);
    alert("Thank you for subscribing!");
    setEmailSubscription("");
  };

  const filteredEvents = React.useMemo(() => {
    let currentEvents = upcomingEvents;

    if (searchTerm) {
      currentEvents = currentEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return currentEvents;
  }, [searchTerm]);

  return (
    <div>
      {/* Hero-like Section */}
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Events"
          description="Join us for exciting events, workshops, and activities designed to support and connect the Bangladeshi student community in Japan."
        />
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full px-4">
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md flex items-center gap-2 justify-center">
            <CalendarDaysIcon className="h-5 w-5" />
            <span>View Upcoming Events</span>
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md flex items-center gap-2 justify-center"
          >
            <Users className="h-5 w-5" />
            <span>Host an Event</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12 bg-[#F0F0F0] py-10">
        <div className="relative w-full lg:w-1/2 mb-10">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Agencies"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full lg:w-[75%]">
          {eventCategories.map((category) => (
            <Card
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center justify-between p-3 text-center rounded-lg cursor-pointer transition-all duration-200
                ${selectedCategory === category.id ? "bg-blue-100 border-primary shadow-md" : "bg-white border border-gray-200 hover:bg-gray-50"}`}
            >
              <CardContent className="flex flex-col items-center justify-center text-center p-0 gap-y-1">
                <category.icon
                  className={`h-6 w-6 ${selectedCategory === category.id ? "text-primary" : "text-gray-600"}`}
                />
                <p
                  className={`text-sm font-medium ${selectedCategory === category.id ? "text-primary" : "text-gray-800"}`}
                >
                  {category.name}
                </p>
                <p className="text-xs text-gray-500">{category.count} Events</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Container className="py-12 md:py-16">
        <SectionHeader
          className="mb-8"
          title="Our Upcoming Events"
          description="Join us for these exciting upcoming events and activities."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <Card
                key={index}
                className="flex flex-col p-6 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="flex flex-col items-start space-y-1">
                    <span className="flex items-center text-sm text-gray-500">
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      {event.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No upcoming events found.
            </p>
          )}
        </div>
        <div className="text-center mb-12">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg">
            View All
          </Button>
        </div>

        {/* Event Impact Section */}
        <SectionHeader
          className="mb-12"
          title="Event Impact"
          description="See how our events are making a difference in the community"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto text-center mb-12">
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">50+</p>
            <p className="text-lg text-gray-700">Events This Year</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">
              2,500+
            </p>
            <p className="text-lg text-gray-700">Total Attendees</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">95%</p>
            <p className="text-lg text-gray-700">Satisfaction Rate</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl md:text-5xl font-bold text-primary">12</p>
            <p className="text-lg text-gray-700">Event Categories</p>
          </div>
        </div>
      </Container>

      <div className="bg-[#F0F0F0]">
        <SectionHeader
          className="py-12 lg:text-nowrap"
          title="Stay Updated"
          description="Subscribe to our newsletter to receive the latest news and updates from BSSAJ"
        />
        <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 pb-12">
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-base"
            value={emailSubscription}
            onChange={(e) => setEmailSubscription(e.target.value)}
          />
          <Button
            onClick={handleSubscriptionSubmit}
            className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg shadow-md flex items-center gap-2 justify-center"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
