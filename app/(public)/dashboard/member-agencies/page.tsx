"use client";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2Icon,
  CheckCircleIcon,
  MapPinIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import DashboardLoading from "@/app/(public)/_components/dashboard-loading";
import { BASE_URL } from "@/lib/constant";
import {
  useDeleteAgencyMutation,
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

interface ApiError {
  status?: number;
  data?: {
    message?: string;
  };
  message?: string;
}

export default function AgencyPage() {
  const [activeTab, setActiveTab] = useState<"Approved" | "Pending">(
    "Approved"
  );

  const user = useAuthUser();
  const userId = user?.id;

  // Delete mutation
  const [deleteAgency, { isLoading: isDeleting }] = useDeleteAgencyMutation();

  console.log("Current user:", user);
  console.log("User ID:", userId);

  const {
    data: agenciesData,
    isLoading,
    isError,

    refetch,
  } = useGetAgenciesByUserIdQuery(userId || "", {
    skip: !userId, // Skip the query if no user ID
  });

  // Also try getting all agencies to see if there's a filtering issue
  const { data: allAgenciesData, refetch: refetchAllAgencies } =
    useGetAllAgencyQuery([{ name: "creatorId", value: userId || "" }], {
      skip: !userId,
    });

  // Handle agency deletion
  const handleDeleteAgency = async (agencyId: string, agencyName: string) => {
    try {
      await deleteAgency(agencyId).unwrap();
      // Manually refetch the data to update the UI
      refetch();
      refetchAllAgencies();
    } catch (error: unknown) {
      // Provide more specific error messages
      const errorStatus = (error as ApiError)?.status;
      const errorData = (error as ApiError)?.data;
      const errorMessage = (error as ApiError)?.message;

      if (errorStatus === 401) {
        toast.error("Unauthorized. Please log in again.");
      } else if (errorStatus === 403) {
        toast.error("You don't have permission to delete this agency.");
      } else if (errorStatus === 404) {
        toast.error("Agency not found.");
      } else if (errorStatus && errorStatus >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          `Failed to delete agency: ${errorData?.message || errorMessage || "Unknown error"}`
        );
      }
    }
  };

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

  // Utility function to construct proper image URLs
  const getImageUrl = (imagePath: string | null): string => {
    if (!imagePath) return "/images/member1.png";

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // If it's a blob URL, return as is
    if (imagePath.startsWith("blob:")) {
      return imagePath;
    }

    // If it's a relative path, construct full URL
    if (imagePath.startsWith("/")) {
      return `${BASE_URL}${imagePath}`;
    }

    // If it's just a filename, construct full URL
    return `${BASE_URL}/uploads/${imagePath}`;
  };

  // Utility function to strip HTML tags for display
  const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  // Handle image loading errors
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = event.target as HTMLImageElement;
    img.src = "/images/member1.png"; // Fallback image
  };

  if (isLoading) {
    return (
      <Container>
        <DashboardLoading message="Loading agencies..." />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <div key={agency.id} className="max-w-md mx-auto w-full">
                  <Card className="overflow-hidden border-0 shadow-lg group h-full flex flex-col transition duration-300 transform hover:-translate-y-1">
                    {/* Agency Logo/Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
                      {agency.logo ? (
                        <Image
                          src={getImageUrl(agency.logo)}
                          alt={`${agency.name} logo`}
                          fill
                          className="object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2Icon className="h-16 w-16 text-gray-400" />
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <CheckCircleIcon className="h-3 w-3" />
                        {agency.status}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 bg-white flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        {agency.name}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {stripHtmlTags(agency.description)}
                      </p>

                      {/* Agency Details */}
                      <div className="space-y-2 mb-6 flex-grow">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="line-clamp-1">
                            {agency.location}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">
                            Category:
                          </span>{" "}
                          {agency.category}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button
                          asChild
                          className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                          <Link
                            href={`/dashboard/member-agencies/edit-agency/${agency.id}`}
                          >
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1 font-medium"
                          onClick={() =>
                            handleDeleteAgency(agency.id, agency.name)
                          }
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            "Deleting..."
                          ) : (
                            <>
                              <Trash2Icon className="h-4 w-4 mr-2" />
                              Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-8">
                No approved agencies found.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="Pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <div key={agency.id} className="max-w-md mx-auto w-full">
                  <Card className="overflow-hidden border-0 shadow-lg group h-full flex flex-col transition duration-300 transform hover:-translate-y-1">
                    {/* Agency Logo/Image */}
                    <div className="relative h-48 bg-gradient-to-br from-yellow-50 to-orange-100">
                      {agency.logo ? (
                        <Image
                          src={getImageUrl(agency.logo)}
                          alt={`${agency.name} logo`}
                          fill
                          className="object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2Icon className="h-16 w-16 text-gray-400" />
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <CheckCircleIcon className="h-3 w-3" />
                        {agency.status}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 bg-white flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        {agency.name}
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {stripHtmlTags(agency.description)}
                      </p>

                      {/* Agency Details */}
                      <div className="space-y-2 mb-6 flex-grow">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="line-clamp-1">
                            {agency.location}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">
                            Category:
                          </span>{" "}
                          {agency.category}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button
                          asChild
                          className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium"
                        >
                          <Link
                            href={`/dashboard/member-agencies/edit-agency/${agency.id}`}
                          >
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1 font-medium"
                          onClick={() =>
                            handleDeleteAgency(agency.id, agency.name)
                          }
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            "Deleting..."
                          ) : (
                            <>
                              <Trash2Icon className="h-4 w-4 mr-2" />
                              Delete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
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
