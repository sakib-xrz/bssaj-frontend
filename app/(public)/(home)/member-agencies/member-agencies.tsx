"use client";

import { Agency as AgencyType } from "@/app/(public)/_components/types";
import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllAgencyQuery } from "@/redux/features/agency/agencyApi";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import Agency from "../../_components/Agency";

const MemberAgencies = () => {
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState("");

  const { isLoading, isError, data } = useGetAllAgencyQuery([
    // { name: 'limit', value: limit },
    // { name: 'page', value: page },
    { name: "search", value: search },
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading agencies</div>;

  return (
    <div>
      <div className="bg-gradient-to-r mb-10 from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          className="mb-12"
          title="Member Agencies"
          description="Explore our network of member agencies supporting Bangladeshi students in Japan."
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full mb-8 max-w-6xl mx-auto">
        <div className="relative w-full sm:w-2/3">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Agencies"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/3">
          <Select value="default">
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
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
          {data?.data?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p>No agencies found</p>
            </div>
          ) : (
            data?.data?.map((item: AgencyType) => (
              <Agency key={item?.id} agency={item} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default MemberAgencies;
