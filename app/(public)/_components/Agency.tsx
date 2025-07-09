"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Agency as AgencyType } from "@/app/(public)/_components/types"
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import deafultImage from '../../../lib/image/deafultImage.jpg';

function Agency({ agency }: { agency: AgencyType }) {
    return (
        <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 flex flex-col items-start hover:scale-[1.02] transition-transform duration-200">
            <CardHeader className="p-0 flex flex-row items-center mb-4 w-full">
                <div className="relative w-15 h-15 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                        src={agency.logo || deafultImage}
                        alt={`${agency?.name} logo`}
                        width={60}
                        height={60}
                        className="object-cover"
                    />
                </div>
                <div className="flex-grow">
                    <CardTitle className="text-xl font-bold text-primary leading-tight mb-1 line-clamp-1">
                        {agency?.name || "Agency Name"}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        {agency?.category || "Consultancy"}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-grow w-full">
                <p className="flex items-center text-sm text-gray-700 mb-3">
                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                    {agency?.location || agency?.address || "Location not specified"}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {agency?.description || "No description available"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
                    <Button
                        asChild
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                    >
                        <Link href={agency?.profileLink || `/agencies/${agency?.id}`}>
                            View Profile
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-blue-50 hover:text-primary font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                    >
                        <Link href={agency?.websiteLink || agency?.website || "#"}>
                            Website
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default Agency;