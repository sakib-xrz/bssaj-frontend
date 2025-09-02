"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import Container from "../../../components/shared/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useGetAllBannerQuery } from "@/redux/features/banner/bannerApi";

// Type for banner data
export interface BannerType {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export default function HeroCarousel() {
  const { isLoading, isError, data } = useGetAllBannerQuery(undefined);

  // Ref for the "Next" button
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-slide effect: simulate click on "Next" button
  useEffect(() => {
    const interval = setInterval(() => {
      if (nextBtnRef.current) {
        nextBtnRef.current.click();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isError) {
    return (
      <section className="flex items-center justify-center py-24">
        <p className="text-lg text-red-500">Failed to load banners.</p>
      </section>
    );
  }

  // Skeleton loader
  if (isLoading) {
    return (
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-white to-blue-100 overflow-hidden">
        <Container>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
            {/* Left side skeleton */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <Skeleton className="h-10 w-3/4 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-full max-w-[700px] mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-2/3 mx-auto lg:mx-0" />
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
            </div>

            {/* Right side skeleton */}
            <div className="flex-1 w-full max-w-lg">
              <Skeleton className="h-[400px] w-full rounded-xl" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const banners: BannerType[] = data || [];

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-white to-blue-100 overflow-hidden">
      <Container>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                  {/* Left side: text */}
                  <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl leading-tight text-primary">
                      {banner.title}
                    </h1>
                    <p className="max-w-[700px] text-lg md:text-xl mx-auto lg:mx-0 text-muted-foreground">
                      {banner.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                      <Button asChild>
                        <Link href={banner.link} target="_blank">
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right side: image */}
                  <div className="flex-1 w-full max-w-lg animate-slide-in-right">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      className="rounded-xl w-full h-auto object-contain"
                      width={600}
                      height={400}
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel controls */}
          <CarouselPrevious className="hidden sm:flex absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 hover:scale-110 transition-transform duration-300 z-20 items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </CarouselPrevious>

          <CarouselNext
            ref={nextBtnRef}
            className="hidden sm:flex absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 hover:scale-110 transition-transform duration-300 z-20 items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </CarouselNext>
        </Carousel>
      </Container>
    </section>
  );
}
