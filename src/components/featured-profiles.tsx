import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Award, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const profiles = [
  {
    id: 1,
    name: "Dr. Fe del Mundo",
    title: "Pioneering Pediatrician",
    category: "Science & Medicine",
    location: "Philippines",
    era: "1911-2011",
    image: "/api/placeholder/300/400",
    achievements: [
      "First woman admitted to Harvard Medical School",
      "Founded first pediatric hospital in Philippines"
    ],
    description: "Groundbreaking pediatrician who revolutionized child healthcare in the Philippines."
  },
  {
    id: 2,
    name: "Carlos P. Romulo",
    title: "Diplomat & Journalist",
    category: "Politics & Law",
    location: "International",
    era: "1898-1985",
    image: "/api/placeholder/300/400",
    achievements: [
      "First Asian UN General Assembly President",
      "Pulitzer Prize winner"
    ],
    description: "Distinguished diplomat and journalist who represented Philippine interests globally."
  },
  {
    id: 3,
    name: "Bruno Mars",
    title: "Global Music Superstar",
    category: "Arts & Entertainment",
    location: "USA (Filipino-Hawaiian)",
    era: "1985-Present",
    image: "/api/placeholder/300/400",
    achievements: [
      "15 Grammy Awards",
      "Over 130 million records sold worldwide"
    ],
    description: "Chart-topping artist of Filipino-Hawaiian descent who conquered global music scene."
  },
  {
    id: 4,
    name: "Gina López",
    title: "Environmental Advocate",
    category: "Social Advocacy",
    location: "Philippines",
    era: "1953-2019",
    image: "/api/placeholder/300/400",
    achievements: [
      "Former Environment Secretary",
      "Founded multiple environmental NGOs"
    ],
    description: "Passionate environmental activist and former government official."
  },
  {
    id: 5,
    name: "Tony Tan Caktiong",
    title: "Business Magnate",
    category: "Business & Innovation",
    location: "Philippines",
    era: "1953-Present",
    image: "/api/placeholder/300/400",
    achievements: [
      "Founder of Jollibee Foods Corporation",
      "Built global Filipino food empire"
    ],
    description: "Entrepreneur who built one of Asia's largest fast-food chains."
  }
];

export function FeaturedProfiles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const profilesPerPage = 3;
  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const nextProfiles = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevProfiles = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProfiles = profiles.slice(
    currentIndex * profilesPerPage,
    (currentIndex + 1) * profilesPerPage
  );

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Profiles
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the stories of remarkable Filipinos who changed the world
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProfiles}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextProfiles}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProfiles.map((profile) => (
            <Card key={profile.id} className="group cursor-pointer hover:shadow-filipino transition-all duration-300 overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-subtle relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <Badge className="mb-2 bg-accent text-accent-foreground">
                    {profile.category}
                  </Badge>
                  <h3 className="font-bold text-xl mb-1">{profile.name}</h3>
                  <p className="text-sm opacity-90">{profile.title}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{profile.era}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Award className="h-4 w-4 text-accent" />
                      <span>Key Achievements:</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {profile.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Read Full Story
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevProfiles}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextProfiles}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
            View All Profiles
          </Button>
        </div>
      </div>
    </section>
  );
}