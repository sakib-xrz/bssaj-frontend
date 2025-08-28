"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllNewsQuery } from "@/redux/features/news/newsApi";
import { Calendar, Eye, Trash2 } from "lucide-react";
import { NewsModal } from "./_newsModal";
import { useState } from "react";
import { NewsType } from "@/lib/types";
import SectionHeader from "@/components/shared/section-header";
import { CustomPagination } from "../../_components/CustomPagination";

const News = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [selectedNews, setSelectedNews] = useState<NewsType | null>(null);
  const {  data } = useGetAllNewsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);
  const totalPages = Math.ceil((data?.meta?.total || 0) / limit);

  return (
    <>
      <div className="bg-gradient-to-r from-white via-[#E6F0FF] to-[#B3D7FF] py-20 text-center">
        <SectionHeader
          title="Latest News"
          description="Stay updated with recent articles"
        />
      </div>

      <div className="container mx-auto min-h-screen">
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

        {totalPages > 1 && (
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mb-10"
          />
        )}
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
