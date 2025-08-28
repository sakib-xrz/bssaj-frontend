import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, Users } from "lucide-react";
import Link from "next/link";
import { Jobs } from "@/lib/types";


export function JobCard({ job }: { job: Jobs }) {
  const formattedDeadline = new Date(job.deadline).toLocaleDateString();

  return (
    <Card className="border border-border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Top bar: Posted by */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-muted-foreground">
            Posted by {job.posted_by.name}
          </span>
        </div>

        {/* Job Title */}
        <Link href={`/jobs/${job.id}`}>
          <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary cursor-pointer">
            {job.title}
          </h3>
        </Link>

        {/* Company Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{job.type}</span>
            <span>•</span>
            <span>{job?.kind}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{job.number_of_vacancies} Vacancy</span>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Deadline</div>
              <div className="font-medium">{formattedDeadline}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Experience (Years)</div>
              <div className="font-medium">{job.experience_min}+</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-muted-foreground">Salary</div>
              <div className="font-medium">
                ${job.salary_min} - ${job.salary_max}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="text-blue-600 bg-blue-50 hover:bg-blue-100"
          >
            {job.company_name}
          </Badge>
          <Button asChild className="bg-blue-900 hover:bg-blue-800 text-white">
            <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
