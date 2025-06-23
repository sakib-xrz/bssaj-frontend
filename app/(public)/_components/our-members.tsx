import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/shared/container";

const memberCards = [
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Founder",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Co-founder",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Member",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Ahmed Bhuiyan Nobab",
    role: "Member",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Another Member",
    role: "Volunteer",
    imageUrl: "/images/member1.png",
  },
  {
    name: "Third Member",
    role: "Advisor",
    imageUrl: "/images/member1.png",
  },
];

const OurMembers: React.FC = () => {
  return (
    <Container className="flex flex-col items-center w-full mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Members
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Partnering with leading organizations to support Bangladeshi students
          in Japan.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {memberCards.map((member, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 pl-4"
            >
              <Card className="rounded-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer">
                <CardContent className="flex flex-col items-center p-0 h-full">
                  <div className="w-full flex-grow flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-100">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>
                  <CardHeader className="text-center p-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute lg:-left-8 left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full shadow-md z-10 p-2 -translate-x-1/2 md:flex items-center justify-center" />
        <CarouselNext className="absolute lg:-right-8 right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full shadow-md z-10 p-2 translate-x-1/2  md:flex items-center justify-center" />
      </Carousel>
    </Container>
  );
};

export default OurMembers;
