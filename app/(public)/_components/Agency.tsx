"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Agency as AgencyType } from "@/lib/types";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import deafultImage from "../../../lib/image/deafultImage.jpg";
import Container from "@/components/shared/container";

function Agency({ agency }: { agency: AgencyType }) {
  return (
    <Container className="lg:py-0 px-0 py-0">
      <Card className="rounded-xl shadow-md border border-gray-200 bg-white p-5 flex flex-col hover:scale-[1.01] transition-transform duration-200 h-full">
        <CardHeader className="p-0 mb-4 flex items-start gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={agency.logo || deafultImage}
              alt={`${agency?.name} logo`}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-primary line-clamp-1">
                {agency?.name || "Agency Name"}
              </h3>
              <span className="text-xs text-gray-600 line-clamp-1">
                • {agency?.category || "Consultancy"}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col justify-between h-full">
          <div>
            {/* Location/Address Section */}
            <p className="flex items-center text-sm text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="line-clamp-2">
                {agency?.location ||
                  agency?.address ||
                  "Location not specified"}
              </span>
            </p>

            {/* Description Section */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {agency?.description || "No description available"}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
            <Button
              asChild
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold text-sm"
            >
              <Link href={agency?.profileLink || `/agencies/${agency?.id}`}>
                View Profile
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-blue-50 text-sm font-semibold"
            >
              <Link href={agency?.websiteLink || agency?.website || "#"}>
                Website
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Agency;
