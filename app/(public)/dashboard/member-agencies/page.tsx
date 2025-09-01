"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2Icon,
  CheckCircleIcon,
  MapPinIcon,
  Trash2Icon,
  PlusIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllAgencyQuery } from "@/redux/features/agency/agencyApi";
import { useAuthUser } from "@/redux/features/auth/authSlice";
import { Agency } from "@/lib/types";

const stripHtmlTags = (html: string) => html.replace(/<[^>]+>/g, "");

export default function AgenciesPage() {
  const user: any = useAuthUser();
  const { data: agencies, isLoading } = useGetAllAgencyQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 999 },
  ]);

  const handleDeleteAgency = (id: string, name: string) => {
    console.log("Delete agency:", id, name);
    // TODO: connect your delete mutation
  };

  const isDeleting = false;

  const information = agencies?.data?.filter(
    (item: Agency) => item?.user_id === user.id
  );

  return (
    <div className="p-6">
      {/* Header */}
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

      {/* Tabs */}
      <Tabs defaultValue="APPROVED" className="w-full">
        <TabsList className="mb-6 bg-gray-100 rounded-lg p-1">
          <TabsTrigger
            value="APPROVED"
            className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="PENDING"
            className="px-6 py-2 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Pending
          </TabsTrigger>
        </TabsList>

        {/* Approved Agencies */}
        <TabsContent value="APPROVED">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <AgencyCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {information
                ?.filter((a: Agency) => a.status === "APPROVED")
                ?.map((agency: Agency) => (
                  <AgencyCard
                    key={agency.id}
                    agency={agency}
                    handleDeleteAgency={handleDeleteAgency}
                    isDeleting={isDeleting}
                  />
                ))}
            </div>
          )}
        </TabsContent>

        {/* Pending Agencies */}
        <TabsContent value="PENDING">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <AgencyCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {information
                ?.filter((a: Agency) => a.status === "PENDING")
                ?.map((agency: any) => (
                  <AgencyCard
                    key={agency.id}
                    agency={agency}
                    handleDeleteAgency={handleDeleteAgency}
                    isDeleting={isDeleting}
                  />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AgencyCard({
  agency,
  handleDeleteAgency,
  isDeleting,
}: {
  agency: Agency;
  handleDeleteAgency: (id: string, name: string) => void;
  isDeleting: boolean;
}) {
  return (
    <div className="max-w-md mx-auto w-full">
      <Card className="overflow-hidden border-0 shadow-lg group h-full flex flex-col transition duration-300 transform hover:-translate-y-1">
        {/* Logo */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
          {agency.logo ? (
            <Image
              src={agency.logo}
              alt={`${agency.name} logo`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2Icon className="h-16 w-16 text-gray-400" />
            </div>
          )}

          {/* Status */}
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <CheckCircleIcon className="h-3 w-3" />
            {agency.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-white flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {agency.name}
          </h2>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {stripHtmlTags(agency.description || "")}
          </p>

          <div className="space-y-2 mb-6 flex-grow">
            <div className="flex items-center text-sm text-gray-500">
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span className="line-clamp-1">
                {agency.address || "No address provided"}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Director:</span>{" "}
              {agency.director_name || "N/A"}
            </div>
          </div>

          {/* Actions */}
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
              onClick={() => handleDeleteAgency(agency.id, agency.name)}
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
  );
}

/* Skeleton Loader */
function AgencyCardSkeleton() {
  return (
    <div className="max-w-md mx-auto w-full">
      <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col">
        {/* Logo Skeleton */}
        <Skeleton className="h-48 w-full" />

        {/* Content Skeleton */}
        <div className="p-6 flex flex-col flex-grow">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-4" />

          <div className="space-y-2 mb-6 flex-grow">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex gap-3 mt-auto">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </Card>
    </div>
  );
}
