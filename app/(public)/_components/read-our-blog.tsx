import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/shared/container";

interface BlogCardProps {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  timeAgo: string;
}

const blogPosts: BlogCardProps[] = [
  {
    id: "1",
    imageSrc: "/images/blog-1.png",
    title: "Navigating Student Life in Japan: A Guide for Bangladeshi Students",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace...",
    authorName: "Nabila Nusrat Nila",
    authorImage: "/images/author-1.jpg",
    timeAgo: "2h ago",
  },
  {
    id: "2",
    imageSrc: "/images/blog-2.png",
    title: "Scholarships & Financial Aid for Bangladeshi Students in Japan",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace...",
    authorName: "Satō Akari",
    authorImage: "/images/author-2.jpg",
    timeAgo: "Yesterday",
  },
  {
    id: "3",
    imageSrc: "/images/blog-3.png",
    title: "Visa Renewal & Part-Time Work Rules Every Student Should Know",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace...",
    authorName: "Nabila Nusrat Nila",
    authorImage: "/images/author-1.jpg",
    timeAgo: "Today",
  },
  {
    id: "4",
    imageSrc: "/images/blog-1.png",
    title: "Japanese Language Proficiency Test (JLPT) Prep Tips",
    description:
      "Mastering the JLPT is crucial for students. Here are some tips and resources to help you prepare effectively...",
    authorName: "Dr. Kenji Tanaka",
    authorImage: "/images/author-2.jpg",
    timeAgo: "3 days ago",
  },
];

const ReadOurBlog: React.FC = () => {
  return (
    <Container className="py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Read Our Blog
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest insights, tips, and stories from our team
          - curated to inspire and inform.
        </p>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {blogPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-4">
                <Card className="group h-full flex flex-col rounded-2xl bg-white shadow-md transition duration-300 transform hover:-translate-y-1">
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      fill
                      className="rounded-t-xl object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="flex flex-col flex-grow p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center mt-auto">
                      <Image
                        src={post.authorImage}
                        alt={post.authorName}
                        width={40}
                        height={40}
                        className="rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {post.authorName}
                        </p>
                        <p className="text-xs text-gray-500">{post.timeAgo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />

        <CarouselNext className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-primary border shadow-lg hover:bg-gray-100 transition z-20 flex items-center justify-center" />
      </Carousel>
    </Container>
  );
};

export default ReadOurBlog;
