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
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      heading: (
        <>
          Bangladesh Students&#39;
          <br className="hidden sm:block" />
          Support in Association Japan
        </>
      ),
      paragraph:
        `The Bangladeshi Students’ Support Association in Japan (BSSAJ) is a non-profit, non-political, and student-focused organization established to assist Bangladeshi students studying and aspiring to study in Japan.
Founded in 2025, BSSAJ is committed to providing educational, administrative, and cultural support to ensure a safer and more enriching academic journey for students.`,
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
        `The Bangladeshi Students’ Support Association in Japan (BSSAJ) is a non-profit, non-political, and student-focused organization established to assist Bangladeshi students studying and aspiring to study in Japan.
Founded in 2025, BSSAJ is committed to providing educational, administrative, and cultural support to ensure a safer and more enriching academic journey for students.`,
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
        `The Bangladeshi Students’ Support Association in Japan (BSSAJ) is a non-profit, non-political, and student-focused organization established to assist Bangladeshi students studying and aspiring to study in Japan.
Founded in 2025, BSSAJ is committed to providing educational, administrative, and cultural support to ensure a safer and more enriching academic journey for students.`,
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
          <CarouselPrevious className="hidden sm:flex absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 hover:scale-110 transition-transform duration-300 z-20 items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </CarouselPrevious>

          <CarouselNext className="hidden sm:flex absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 hover:scale-110 transition-transform duration-300 z-20 items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </CarouselNext>
        </Carousel>
      </Container>
    </section>
  );
}
