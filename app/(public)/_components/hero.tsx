import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Container from "../../../components/shared/container";
import hero from "@/public/images/hero-img.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      heading: (
        <>
          Bangladesh Student
          <br className="hidden sm:block" />
          Support Association Japan
        </>
      ),
      paragraph:
        "Supporting Bangladeshi students in Japan with community, resources, and opportunity.",
      imageSrc: hero,
      imageAlt: "Students in Japan 1",
    },
    {
      id: 2,
      heading: (
        <>
          Empowering
          <br className="hidden sm:block" />
          Your Journey in Japan
        </>
      ),
      paragraph:
        "Discover tailored resources, scholarship opportunities, and a vibrant community.",
      imageSrc: hero,
      imageAlt: "Students in Japan 2",
    },
    {
      id: 3,
      heading: (
        <>
          Connect, Grow,
          <br className="hidden sm:block" />
          Succeed In Japan
        </>
      ),
      paragraph:
        "Join a network designed to help you thrive academically and professionally.",
      imageSrc: hero,
      imageAlt: "Students in Japan 3",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-white to-blue-100 overflow-hidden">
      <Container>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                  <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl leading-tight text-primary">
                      {slide.heading}
                    </h1>
                    <p className="max-w-[700px] text-lg md:text-xl mx-auto lg:mx-0 text-muted-foreground">
                      {slide.paragraph}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                      <Button asChild>
                        <Link href="#about">Learn More</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 w-full max-w-lg animate-slide-in-right">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      className="rounded-xl w-full h-auto object-contain"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-200 transition z-20 flex items-center justify-center" />

          <CarouselNext className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
        </Carousel>
      </Container>
    </section>
  );
}
