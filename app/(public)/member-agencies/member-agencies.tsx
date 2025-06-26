"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, MapPinIcon } from "lucide-react";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import Link from "next/link";

interface AgencyCardProps {
  id: string;
  logo: string;
  name: string;
  category: string;
  location: string;
  description: string;
  profileLink: string;
  websiteLink: string;
}

const allAgencies: AgencyCardProps[] = [
  {
    id: "1",
    logo: "/images/memberAgencies.png",
    name: "Japan Study Center",
    category: "Education",
    location: "Tokyo",
    description:
      "Provides comprehensive support for international students seeking to study in Japan.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "2",
    logo: "/images/memberAgencies.png",
    name: "Bangladesh Embassy Japan",
    category: "Government",
    location: "Tokyo",
    description:
      "Provides comprehensive support for international students seeking to study in Japan.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "3",
    logo: "/images/memberAgencies.png",
    name: "JICA Bangladesh",
    category: "International Organization",
    location: "Tokyo",
    description:
      "Provides comprehensive support for international students seeking to study in Japan.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "4",
    logo: "/images/memberAgencies.png",
    name: "Japan Study Center",
    category: "Education",
    location: "Tokyo",
    description:
      "Provides comprehensive support for international students seeking to study in Japan.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "5",
    logo: "/images/memberAgencies.png",
    name: "Japan Study Center",
    category: "Education",
    location: "Tokyo",
    description:
      "Provides comprehensive support for international students seeking to study in Japan.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "6",
    logo: "/images/memberAgencies.png",
    name: "Japan Study Center",
    category: "Education",
    location: "Tokyo",
    description:
      "Provides comprehensive support for international students seeking to study in Japan.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "7",
    logo: "/images/memberAgencies.png",
    name: "Another Agency",
    category: "Support",
    location: "Osaka",
    description:
      "Offering various support programs for international residents.",
    profileLink: "#",
    websiteLink: "#",
  },
  {
    id: "8",
    logo: "/images/memberAgencies.png",
    name: "Global Connect",
    category: "Community",
    location: "Kyoto",
    description: "Connecting international students with local communities.",
    profileLink: "#",
    websiteLink: "#",
  },
];

const ITEMS_PER_LOAD = 6;

const MemberAgencies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [visibleAgencies, setVisibleAgencies] = useState<AgencyCardProps[]>([]);
  const [loadCount, setLoadCount] = useState(ITEMS_PER_LOAD);

  const filteredAndSortedAgencies = React.useMemo(() => {
    const currentAgencies = allAgencies.filter(
      (agency) =>
        agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "name-asc") {
      currentAgencies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      currentAgencies.sort((a, b) => b.name.localeCompare(a.name));
    }

    return currentAgencies;
  }, [searchTerm, sortBy]);
  useEffect(() => {
    setVisibleAgencies(filteredAndSortedAgencies.slice(0, loadCount));
  }, [filteredAndSortedAgencies, loadCount]);

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  };

  return (
    <Container className="py-12 md:py-16">
      <SectionHeader
        className="mb-12"
        title="Member Agencies"
        description="Explore our network of member agencies supporting Bangladeshi students in Japan."
      />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full mb-8 max-w-6xl mx-auto">
        <div className="relative w-full sm:w-2/3">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Agencies"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
              <SelectValue placeholder="Sort by default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Sort by default</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
        {visibleAgencies.length > 0 ? (
          visibleAgencies.map((agency) => (
            <Card
              key={agency.id}
              className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 flex flex-col items-start hover:scale-[1.02]"
            >
              <CardHeader className="p-0 flex flex-row items-center mb-4 w-full">
                <Image
                  src={agency.logo}
                  alt={`${agency.name} logo`}
                  width={60}
                  height={60}
                  className="rounded-full object-cover flex-shrink-0 mr-4"
                />
                <div className="flex-grow">
                  <CardTitle className="text-xl font-bold text-primary leading-tight mb-1">
                    {agency.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {agency.category}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow w-full">
                <p className="flex items-center text-sm text-gray-700 mb-3">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  {agency.location}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {agency.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-auto w-full">
                  <Button
                    asChild
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                  >
                    <Link href={agency.profileLink}>View Profile</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                  >
                    <Link href={agency.websiteLink}>Website</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No agencies found matching your criteria.
          </p>
        )}
      </div>

      {loadCount < filteredAndSortedAgencies.length && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md"
          >
            Load More Agencies
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MemberAgencies;
