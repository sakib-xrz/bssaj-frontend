"use client";

import { format } from "date-fns";
import { BuildingIcon, CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import Container from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetScholarshipsQuery } from "@/redux/features/scholarship/scholarshipApi";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  provider: string;
  amount: number;
  deadline: string;
  application_url: string;
}

export default function ScholarshipPage() {
  const { data: scholarships, isLoading, error } = useGetScholarshipsQuery({});

  useEffect(() => {
    if (error) {
      toast.error("Failed to load scholarships");
    }
  }, [error]);

  // Debug: Log the API response only when it changes
  useEffect(() => {
    console.log("Scholarships API Response:", scholarships);
    console.log("Scholarships type:", typeof scholarships);
    console.log("Scholarships is array:", Array.isArray(scholarships));
  }, [scholarships]);

  const handleApply = (applicationUrl: string) => {
    window.open(applicationUrl, "_blank");
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDeadline = (deadline: string) => {
    return format(new Date(deadline), "PPP");
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  // Safely handle different API response structures
  const getScholarshipsArray = () => {
    if (!scholarships) return [];

    // If scholarships is directly an array
    if (Array.isArray(scholarships)) {
      return scholarships;
    }

    // If scholarships is an object with a data property (common API structure)
    if (
      scholarships &&
      typeof scholarships === "object" &&
      "data" in scholarships
    ) {
      return Array.isArray(scholarships.data) ? scholarships.data : [];
    }

    // If scholarships is an object with a results property
    if (
      scholarships &&
      typeof scholarships === "object" &&
      "results" in scholarships
    ) {
      return Array.isArray(scholarships.results) ? scholarships.results : [];
    }

    // If scholarships is an object with any array property, try to find it
    if (scholarships && typeof scholarships === "object") {
      for (const key in scholarships) {
        if (Array.isArray(scholarships[key])) {
          return scholarships[key];
        }
      }
    }

    return [];
  };

  const scholarshipsArray = getScholarshipsArray();

  // Filter only active scholarships (deadline not passed)
  const activeScholarships = scholarshipsArray.filter(
    (scholarship: Scholarship) => !isDeadlinePassed(scholarship.deadline)
  );

  // If no active scholarships, don't show the page
  if (!isLoading && activeScholarships.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            No Active Scholarships Available
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Currently, there are no active scholarship opportunities. Please
            check back later for new scholarships or contact us for more
            information.
          </p>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-gray-600">
              <strong>Debug Info:</strong>
              <br />
              Raw API Response: {JSON.stringify(scholarships, null, 2)}
              <br />
              Scholarships type: {typeof scholarships}
              <br />
              Is Array: {Array.isArray(scholarships) ? "Yes" : "No"}
              <br />
              Extracted array length: {scholarshipsArray.length}
              <br />
              Active scholarships: {activeScholarships.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">
            Loading scholarships...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/header-bg.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 drop-shadow-lg">
            Available Scholarships
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Discover and apply for scholarships to support your educational
            journey
          </p>
          {/* Debug info */}
          <div className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-lg">
            Showing {activeScholarships.length} active scholarships
          </div>
        </div>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {activeScholarships.map((scholarship: Scholarship) => (
            <Card
              key={scholarship.id}
              className="rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="default"
                    className="text-xs bg-green-100 text-green-700"
                  >
                    Active
                  </Badge>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {formatAmount(scholarship.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Award Amount
                    </p>
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                  {scholarship.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BuildingIcon className="h-4 w-4 mr-2" />
                  {scholarship.provider}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-sm text-gray-600 line-clamp-3">
                  {scholarship.description}
                </CardDescription>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-green-600 font-medium">
                      Deadline: {formatDeadline(scholarship.deadline)}
                    </span>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium text-gray-700 mb-1">
                      Eligibility:
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      {scholarship.eligibility}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => handleApply(scholarship.application_url)}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
