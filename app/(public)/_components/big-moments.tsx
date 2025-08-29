"use client";

import Image from "next/image";
import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GalleryItem } from "@/lib/types";
import { useGeteAllGalleryQuery } from "@/redux/features/gallery/galleryApi";

const OurBigMoments = () => {
  const { data: mainData } = useGeteAllGalleryQuery(undefined);
  const data: GalleryItem[] = mainData?.data || [];

  return (
    <Container className="py-12 flex flex-col items-center">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Big Moments
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A glimpse into our journey, achievements, and celebrations.
        </p>
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {data.map((moment: GalleryItem) => (
            <CarouselItem
              key={moment.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-4">
                {moment.link ? (
                  <a
                    href={moment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="group h-full flex flex-col rounded-2xl bg-white shadow-md transition duration-300 transform hover:-translate-y-1">
                      <div className="relative w-full aspect-[16/10]">
                        <Image
                          src={moment.image}
                          alt={moment.title}
                          fill
                          className="rounded-t-xl object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary">
                          {moment.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card className="group h-full flex flex-col rounded-2xl bg-white shadow-md transition duration-300 transform hover:-translate-y-1">
                    <div className="relative w-full aspect-[16/10]">
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        fill
                        className="rounded-t-xl object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {moment.title}
                      </h3>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <CarouselPrevious className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
        <CarouselNext className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
      </Carousel>
    </Container>
  );
};

export default OurBigMoments;
