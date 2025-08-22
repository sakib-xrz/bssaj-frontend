"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllNewsQuery } from "@/redux/features/news/newsApi";
import { Calendar, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { NewsType } from "@/lib/types";
import SectionHeader from "@/components/shared/section-header";
import { CustomPagination } from "./CustomPagination";
import { NewsModal } from "../(home)/news/_newsModal";

const News = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);
  const { isLoading, isError, data } = useGetAllNewsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);
 
  return (
    <>
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
            Latest News
          </h1>
          <p className="text-lg md:text-xl text-[#868686] max-w-2xl mx-auto">
            Stay updated with the latest news, articles, and resources.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10 lg:grid-cols-3 gap-5 mx-auto">
          {data?.data?.map((item: NewsType) => (
            <Card
              key={item.id}
              className="w-full max-w-md transition-all duration-300 hover:shadow-lg border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg font-bold text-card-foreground leading-tight flex-1 line-clamp-2">
                    {item.title}
                  </CardTitle>
                  {item.is_deleted && (
                    <Badge
                      variant="destructive"
                      className="text-xs flex items-center gap-1 bg-destructive/10 text-destructive border-destructive/20"
                    >
                      <Trash2 className="w-3 h-3" />
                      Deleted
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span className="line-clamp-2">{item?.content}</span>
                  </div>
                </div>

                {!item.is_deleted && (
                  <div className="pt-3">
                    <Button
                      onClick={() => {
                        setSelectedNews(item);
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedNews && (
        <NewsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          news={selectedNews}
        />
      )}
    </>
  );
};

export default News;
