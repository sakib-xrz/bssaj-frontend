import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
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

const LatestNews: React.FC = () => {
  const articlesLeft = articles.slice(0, articles.length / 2);
  const articlesRight = articles.slice(articles.length / 2);

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
              {articlesLeft.map((article, index) => (
                <div key={`left-${index}`}>
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

            {/* Vertical Divider */}
            <div className="hidden md:flex justify-center">
              <div className="w-px bg-gray-200 h-full" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col pl-3 md:pl-6">
              {articlesRight.map((article, index) => (
                <div key={`right-${index}`}>
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
                    <hr className="my-2 md:my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button className="bg-primary mt-10  text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg">
        View All
      </Button>
    </Container>
  );
};

export default LatestNews;
