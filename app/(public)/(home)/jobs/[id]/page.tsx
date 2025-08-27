"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users,
  Briefcase,
  Globe,
  Building,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetSingleJobsQuery } from "@/redux/features/jobs/jobApi";
import SectionHeader from "@/components/shared/section-header";

export default function JobDetailPage() {
  const params = useParams();
  const { isLoading, isError, data } = useGetSingleJobsQuery(params.id);

  // Skeleton component
  const Skeleton = ({ className }: { className: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <Skeleton className="w-32 h-10" />
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <Skeleton className="w-64 h-8" />
            <Skeleton className="w-40 h-10" />
          </div>
          <Skeleton className="w-32 h-20" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="w-full h-60" />
            <Skeleton className="w-full h-80" />
          </div>
          <div className="space-y-4">
            <Skeleton className="w-full h-60" />
          </div>
        </div>
      </div>
    );

  if (isError || !data) return <div>Error loading job details.</div>;

  const job = data.data;
  const formattedDeadline = new Date(job.deadline).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          title="Find Job"
          description="Find Career opportunities and job Openings from the Bangladesh Student Support Association Japan"
        />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/jobs">
          <Button variant="outline" className="mb-6 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            <Button
              asChild
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          </div>
          <div>
            {job.company_logo ? (
              <Image
                src={job.company_logo}
                alt={job.company_name}
                width={120}
                height={80}
                className="rounded-lg border"
              />
            ) : (
              <div className="w-[120px] h-[80px] flex items-center justify-center rounded-lg border text-sm bg-gray-50">
                No Logo
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Summary & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Job Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Deadline</div>
                      <div className="text-sm text-muted-foreground">
                        {formattedDeadline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Experience</div>
                      <div className="text-sm text-muted-foreground">
                        {job.experience_min}+ years
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Vacancy</div>
                      <div className="text-sm text-muted-foreground">
                        {job.number_of_vacancies}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Work Nature</div>
                      <div className="text-sm text-muted-foreground">
                        {job.kind}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Salary</div>
                      <div className="text-sm text-muted-foreground">
                        ${job.salary_min} - ${job.salary_max}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {job.company_address}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Job Description</CardTitle>
              </CardHeader>
              <CardContent
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </Card>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{job.company_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.company_website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={job.company_website}
                      className="text-sm text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {job.company_website}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {job.company_address}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {job.company_email} | {job.company_phone}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
