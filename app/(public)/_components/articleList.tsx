import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDaysIcon } from "lucide-react";

interface Article {
  title: string;
  date: string;
  description: string;
}

const articles: Article[] = [
  {
    title: "Guide to Student Life in Japan",
    date: "May 15, 2024",
    description:
      "Essential tips for Bangladeshi students adjusting to life in Japan. Essential tips for Bangladeshi students adjusting to life in Japan.....",
  },
  {
    title: "Scholarship Opportunities for 2024",
    date: "May 15, 2024",
    description:
      "A comprehensive list of scholarships available for Bangladeshi students. A comprehensive list of scholarships available for Bangladeshi students.....",
  },
  {
    title: "Understanding the Japanese Work Culture",
    date: "May 15, 2024",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace norms and expectations.....",
  },
  {
    title: "Guide to Student Life in Japan",
    date: "May 15, 2024",
    description:
      "Essential tips for Bangladeshi students adjusting to life in Japan. Essential tips for Bangladeshi students adjusting to life in Japan.....",
  },
  {
    title: "Scholarship Opportunities for 2024",
    date: "May 15, 2024",
    description:
      "A comprehensive list of scholarships available for Bangladeshi students. A comprehensive list of scholarships available for Bangladeshi students.....",
  },
  {
    title: "Understanding the Japanese Work Culture",
    date: "May 15, 2024",
    description:
      "Key insights into Japanese workplace norms and expectations. Key insights into Japanese workplace norms and expectations.....",
  },
];

const ArticleList: React.FC = () => {
  const articlesLeft = articles.slice(0, articles.length / 2);
  const articlesRight = articles.slice(articles.length / 2);

  return (
    <div className="container mx-auto p-4 md:p-8 flex justify-center items-center min-h-screen">
      <Card className="w-full md:max-w-3xl lg:max-w-5xl rounded-xl shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-0">
            <div className="flex flex-col pr-3 md:pr-4">
              {articlesLeft.map((article, index) => (
                <div key={`left-${index}`} className="py-3 md:py-4">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                    {article.title}
                  </h3>

                  <p className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                    <CalendarDaysIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {article.date}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {article.description}
                  </p>

                  {index < articlesLeft.length - 1 && (
                    <hr className="my-2 md:my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col pl-3 md:pl-4 md:border-l md:border-gray-200">
              {articlesRight.map((article, index) => (
                <div key={`right-${index}`} className="py-3 md:py-4">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                    {article.title}
                  </h3>
                  <p className="flex items-center text-xs md:text-sm text-gray-500 mb-2">
                    <CalendarDaysIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    {article.date}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {article.description}
                  </p>

                  {index < articlesRight.length - 1 && (
                    <hr className="my-3 md:my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleList;
