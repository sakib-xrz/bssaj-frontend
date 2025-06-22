import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import Container from "@/components/shared/container";

interface TestimonialCardProps {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  rating: number;
}
const testimonials: TestimonialCardProps[] = [
  {
    id: "1",
    quote:
      "“This is an amazing product. It solved all our problems and support was fantastic!”",
    authorName: "John Doe",
    authorTitle: "CEO of Acme Corp",
    authorImage: "/images/client1.png",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "“Exceptional quality and customer service. I couldn't be happier with my purchase.”",
    authorName: "Jane Smith",
    authorTitle: "Marketing Director",
    authorImage: "/images/client2.png",
    rating: 4,
  },
  {
    id: "3",
    quote:
      "“A game changer for our business. Highly recommend to anyone on the fence.”",
    authorName: "Michael Johnson",
    authorTitle: "Entrepreneur",
    authorImage: "/images/client3.png",
    rating: 5,
  },
];

const OurTrustedClients: React.FC = () => {
  return (
    <Container className="py-12 flex flex-col items-center">
      {/* Top Section: Heading and Paragraph */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Trusted Clients
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Hear from the people who have experienced the difference. Real
          stories, real results.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="p-0 flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src={testimonial.authorImage}
                  alt={testimonial.authorName}
                  width={80}
                  height={80}
                  className="rounded-full object-cover border-2 border-gray-100 shadow-sm"
                />
              </div>
              <p className="text-lg text-gray-800 mb-4 italic leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } fill-current`}
                  />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {testimonial.authorName}
              </h3>
              <p className="text-sm text-gray-600">{testimonial.authorTitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <Button className="bg-primary  text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg">
        View All
      </Button>
    </Container>
  );
};

export default OurTrustedClients;
