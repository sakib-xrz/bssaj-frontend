"use client";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircleIcon, Loader2, MapPinIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  useGetAgenciesByUserIdQuery,
  useGetAllAgencyQuery,
} from "@/redux/features/agency/agencyApi";
import { useAuthUser } from "@/redux/features/auth/authSlice";

interface Agency {
  id: string;
  logo: string | null;
  name: string;
  category: string;
  location: string;
  description: string;
  status: "Approved" | "Pending" | "APPROVED" | "PENDING";
  user_id?: string;
  creator_id?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function AgencyPage() {
  const [activeTab, setActiveTab] = useState<"Approved" | "Pending">(
    "Approved"
  );

  const user = useAuthUser();
  const userId = user?.id;

  console.log("Current user:", user);
  console.log("User ID:", userId);

  const {
    data: agenciesData,
    isLoading,
    isError,
    error,
  } = useGetAgenciesByUserIdQuery(userId || "", {
    skip: !userId, // Skip the query if no user ID
  });

  // Also try getting all agencies to see if there's a filtering issue
  const { data: allAgenciesData } = useGetAllAgencyQuery(
    [{ name: "creatorId", value: userId || "" }],
    {
      skip: !userId,
    }
  );

  console.log("Agencies data:", agenciesData);
  console.log("All agencies:", agenciesData?.data);
  console.log("Alternative agencies data:", allAgenciesData);
  console.log("Alternative all agencies:", allAgenciesData?.data);

  // Use the first approach, but fall back to the alternative if needed
  const allAgencies: Agency[] =
    agenciesData?.data || allAgenciesData?.data || [];

  // Debug: Log all unique status values
  const uniqueStatuses = Array.from(
    new Set(allAgencies.map((agency) => agency.status))
  );
  console.log("Unique status values:", uniqueStatuses);

  // Filter agencies by user ID first, then by status
  const userAgencies = allAgencies.filter((agency) => {
    // Check if the agency belongs to the current user
    // The agency should have a user_id or creator_id field that matches the current user's ID
    console.log("Agency:", agency);
    console.log("Agency user_id:", agency.user_id);
    console.log("Agency creator_id:", agency.creator_id);
    console.log("Current user ID:", userId);

    return (
      agency.user_id === userId ||
      agency.creator_id === userId ||
      agency.user?.id === userId
    );
  });

  console.log("User agencies after filtering:", userAgencies);

  const filteredAgencies = userAgencies.filter((agency) => {
    const agencyStatus = agency.status?.toLowerCase();
    const activeTabLower = activeTab.toLowerCase();
    return agencyStatus === activeTabLower;
  });

  // Helper function to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <Container className="py-12 md:py-16 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-4 text-lg text-primary">Loading agencies...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-12 md:py-16 text-center text-red-500">
        Please log in to view your agencies.
      </Container>
    );
  }

  if (isError) {
    console.error("Failed to fetch agencies:", error);
    return (
      <Container className="py-12 md:py-16 text-center text-red-500">
        <div className="space-y-4">
          <p>Error loading agencies. Please try again later.</p>
          <p className="text-sm text-gray-600">
            Check the browser console for more details.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Manage Agencies
        </h1>
        <Link href="/dashboard/member-agencies/create-agency">
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Create new agency
          </Button>
        </Link>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "Approved" | "Pending")}
        className="w-full"
      >
        <TabsList className="mb-6 bg-gray-100 rounded-lg p-1">
          <TabsTrigger
            value="Approved"
            className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="Pending"
            className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Approved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <Card
                  key={agency.id}
                  className="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden"
                >
                  <CardHeader className="p-4 flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-200 flex items-center justify-center">
                        {agency.logo ? (
                          <Image
                            src={agency.logo}
                            alt={`${agency.name} logo`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-xl font-semibold text-gray-600">
                            {getInitials(agency.name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
                          {agency.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {agency.category}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3" />
                      {agency.status}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="flex items-center text-sm text-gray-700 mb-3">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                      {agency.location}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {agency.description}
                    </p>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      >
                        <Link
                          href={`/dashboard/member-agencies/edit-agency/${agency.id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                No approved agencies found.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="Pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <Card
                  key={agency.id}
                  className="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden"
                >
                  <CardHeader className="p-4 flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-gray-200 flex items-center justify-center">
                        {agency.logo ? (
                          <Image
                            src={agency.logo}
                            alt={`${agency.name} logo`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-xl font-semibold text-gray-600">
                            {getInitials(agency.name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
                          {agency.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {agency.category}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3" />
                      {agency.status}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="flex items-center text-sm text-gray-700 mb-3">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                      {agency.location}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {agency.description}
                    </p>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      >
                        <Link
                          href={`/dashboard/member-agencies/edit-agency/${agency.id}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                No pending agencies found.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
