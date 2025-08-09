"use client";

import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllNewsQuery } from "@/redux/features/news/newsApi";
import { CalendarDaysIcon } from "lucide-react";
import { useState } from "react";

interface News {
  id: string;
  title: string;
  date?: string;
  created_at?: string;
  description?: string;
  content?: string;
}

const LatestNews: React.FC = () => {
  const { data, isLoading, isError } = useGetAllNewsQuery({});
  const articles: News[] = data?.data || [];

  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const handleOpenModal = (news: News) => setSelectedNews(news);
  const handleCloseModal = () => setSelectedNews(null);

  const articlesLeft = articles.slice(0, Math.ceil(articles.length / 2));
  const articlesRight = articles.slice(Math.ceil(articles.length / 2));

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className="py-12 text-center">Loading latest news...</div>;
  }
  if (isError) {
    return (
      <div className="py-12 text-center text-red-500">Failed to load news.</div>
    );
  }

  return (
    <Container className="flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Latest News
        </h1>
        <p className="text-lg md:text-xl text-[#868686] max-w-2xl mx-auto">
          Stay updated with the latest news, articles, and resources.
        </p>
      </div>
      <Card className="w-full rounded-xl shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-y-0">
            {/* Left Column */}
            <div className="flex flex-col pr-3 md:pr-6">
              {articlesLeft.map((article: News, index: number) => (
                <div
                  key={`left-${index}`}
                  className="cursor-pointer hover:bg-gray-100 hover:shadow-lg transition rounded p-2"
                  onClick={() => handleOpenModal(article)}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-1 line-clamp-2">
                    {article.description}
                  </p>
                  <p className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                    <CalendarDaysIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {formatDate(article.date || article.created_at)}
                  </p>
                  {index < articlesLeft.length - 1 && (
                    <hr className="my-2 md:my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:flex justify-center">
              <div className="w-px bg-gray-200 h-full" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col md:pl-6">
              {articlesRight.map((article: News, index: number) => (
                <div
                  key={`right-${index}`}
                  className="cursor-pointer hover:bg-gray-100 hover:shadow-lg transition rounded p-2"
                  onClick={() => handleOpenModal(article)}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-1 line-clamp-2">
                    {article.description}
                  </p>
                  <p className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                    <CalendarDaysIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {formatDate(article.date || article.created_at)}
                  </p>
                  {index < articlesRight.length - 1 && (
                    <hr className="my-2 md:my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Modal */}
      <Dialog open={!!selectedNews} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-5xl p-0 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold text-primary">
              {selectedNews?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center text-xs md:text-sm text-gray-500 mt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4" />
              {formatDate(selectedNews?.date || selectedNews?.created_at)}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-4">
            <div
              className="text-base text-gray-700 mb-2 max-h-48 overflow-y-auto pr-2"
              style={{ whiteSpace: "pre-line" }}
            >
              {selectedNews?.content ||
                selectedNews?.description ||
                "No full content available."}
            </div>
          </div>
          <DialogFooter className="px-6 pb-4 flex justify-end">
            <DialogClose asChild>
              <Button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default LatestNews;
