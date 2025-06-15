import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-white to-blue-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight text-primary">
              Bangladesh Student Support
              <br className="hidden sm:block" /> Association Japan
            </h1>
            <p className="max-w-[700px] text-lg md:text-xl mx-auto lg:mx-0 text-muted-foreground">
              Supporting Bangladeshi students in Japan with community,
              resources, and opportunity.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover:bg-primary/10 transition"
              >
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-lg animate-slide-in-right">
            <Image
              src="/images/hero-img.png"
              alt="Students in Japan"
              width={544}
              height={500}
              className="rounded-xl shadow-lg w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
