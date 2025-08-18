"use client";

import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { useGetMembersQuery } from "@/redux/features/member/memberApi";
import { useEffect, useMemo, useState } from "react";
import { CustomPagination } from "../../_components/CustomPagination";
import MemberCard, { Member } from "./_components/member-card";

export default function Members() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [limit] = useState(8);
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, error } = useGetMembersQuery([
    {
      name: "search",
      value: debouncedSearch,
    },
    {
      name: "limit",
      value: limit,
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "status",
      value: "APPROVED",
    },
  ]);

  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // Sort & filter approved members
  const approvedMembers = useMemo(() => {
    const fetchedMembers: Member[] = data?.data || [];
    return [...fetchedMembers].filter((member) => member.status === "APPROVED");
  }, [data?.data]);

  if (isLoading) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-primary">Loading members...</p>
      </Container>
    );
  }

  if (isError) {
    console.error("Failed to fetch members:", error);
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-red-500">
          Error loading members. Please try again later.
        </p>
      </Container>
    );
  }

  if (!approvedMembers.length) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[50vh] py-12 md:py-16">
        <p className="text-lg text-gray-600">No approved members found.</p>
      </Container>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20">
        <SectionHeader
          className="mb-20"
          title="Our Executive Members"
          description="Explore our network of member agencies supporting Bangladeshi students in Japan."
        />
      </div>
      <div className="max-w-lg mx-auto text-center my-10">
        <Input
          placeholder="Search member"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Container className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12 md:py-16">
        {approvedMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Container>

      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mb-10"
      />
    </div>
  );
}
