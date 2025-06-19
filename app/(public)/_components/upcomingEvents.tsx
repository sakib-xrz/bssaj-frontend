import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDaysIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
}

const eventCards: EventCardProps[] = [
  {
    title: "Annual Cultural Festival",
    date: "May 15, 2024",
    location: "Tokyo International Forum",
  },
  {
    title: "Scholarship Information Session",
    date: "May 15, 2024",
    location: "Online Webinar",
  },
  {
    title: "Career Fair For International Student",
    date: "May 15, 2024",
    location: "Yokohama Convention Center",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center mb-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Upcoming Events
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Join us for these exciting upcoming events and activities.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {eventCards.map((event, index) => (
          <Card
            key={index}
            className="flex flex-col p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </CardTitle>
              <CardDescription className="flex flex-col items-start space-y-1">
                <span className="flex items-center text-sm text-gray-500">
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
                  {event.date}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {event.location}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-auto">
              <Button className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                Learn more
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
