"use client"
import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Blog } from "@/lib/types";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import Image from "next/image";
import Link from "next/link";


const ReadOurBlog= () => {
  const {data:mainData} = useGetAllBlogsQuery([])
  const data = mainData?.data?.filter((item:Blog)=> item.is_approved === true)
  console.log(data,'blogData')
  return (
    <Container className="py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Read Our Blogs
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest insights, tips, and stories from our team
          - curated to inspire and inform.
        </p>
      </div>
       <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent className="-ml-4">
        {data?.map((post: Blog) => (
          <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="p-4">
              <Link href={`/blogs/${post.slug}`} className="block h-full">
                <Card className="group h-full flex flex-col rounded-2xl bg-white shadow-md transition duration-300 transform hover:-translate-y-1">
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={post.cover_image}
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
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {post.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
                    </p>
                    <div className="flex items-center mt-auto">
                      <Image
                        src={post.author?.profile_picture || "/placeholder.jpg"}
                        alt={post.author?.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {post.author?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
