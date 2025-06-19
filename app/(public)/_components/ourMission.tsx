import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UsersIcon,
  GraduationCapIcon,
  CalendarIcon,
  HeartHandshakeIcon,
} from "lucide-react";

interface MissionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const missionCards: MissionCardProps[] = [
  {
    icon: UsersIcon,
    title: "Community",
    description: "Building connections among Bangladeshi students",
  },
  {
    icon: GraduationCapIcon,
    title: "Education",
    description: "Supporting academic excellence and growth",
  },
  {
    icon: CalendarIcon,
    title: "Events",
    description: "Organizing cultural and educational activities",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Support",
    description: "Providing guidance and assistance",
  },
];

const OurMission: React.FC = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center md:p-8 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight">
          Our Mission
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          To create a supportive community for Bangladeshi students in Japan,
          providing resources, guidance, and opportunities for academic and
          professional growth while fostering cultural exchange between
          Bangladesh and Japan.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {missionCards.map((card, index) => (
          <Card
            key={index}
            className="flex flex-col items-center text-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <CardHeader className="flex flex-col items-center justify-center gap-2 pt-6">
              <div className="bg-primary/10 rounded-full p-3">
                <card.icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6 px-6">
              <CardDescription className="text-sm text-gray-600 leading-relaxed text-muted-foreground">
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OurMission;
