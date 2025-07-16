import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/ui/profile-card";

const profiles = [
  {
    id: "1",
    name: "Dr. Fe del Mundo",
    slug: "fe-del-mundo",
    image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face",
    category: "Science & Medicine" as const,
    tagline: "Pioneering pediatrician who revolutionized child healthcare in the Philippines",
    achievements: [
      "First woman admitted to Harvard Medical School",
      "Founded first pediatric hospital in Philippines",
      "Pioneered modern pediatric care in Asia"
    ]
  },
  {
    id: "2", 
    name: "Carlos P. Romulo",
    slug: "carlos-romulo",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=face",
    category: "Politics & Law" as const,
    tagline: "Distinguished diplomat and journalist who represented Philippine interests globally",
    achievements: [
      "First Asian UN General Assembly President",
      "Pulitzer Prize winner",
      "Signed UN Charter for Philippines"
    ]
  },
  {
    id: "3",
    name: "Bruno Mars",
    slug: "bruno-mars", 
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop&crop=face",
    category: "Arts & Entertainment" as const,
    tagline: "Chart-topping artist of Filipino-Hawaiian descent who conquered global music scene",
    achievements: [
      "15 Grammy Awards",
      "Over 130 million records sold worldwide",
      "Multiple Billboard #1 hits"
    ]
  },
  {
    id: "4",
    name: "Gina López", 
    slug: "gina-lopez",
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop&crop=face",
    category: "Social Advocacy" as const,
    tagline: "Passionate environmental activist and former government official",
    achievements: [
      "Former Environment Secretary",
      "Founded multiple environmental NGOs",
      "Championed indigenous rights"
    ]
  },
  {
    id: "5",
    name: "Tony Tan Caktiong",
    slug: "tony-tan-caktiong",
    image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face",
    category: "Business & Innovation" as const,
    tagline: "Entrepreneur who built one of Asia's largest fast-food chains",
    achievements: [
      "Founder of Jollibee Foods Corporation", 
      "Built global Filipino food empire",
      "Forbes billionaire list"
    ]
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

  const handleViewProfile = (slug: string) => {
    console.log("Viewing profile:", slug);
    // TODO: Navigate to profile page
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 justify-items-center">
          {currentProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              person={profile}
              onViewProfile={handleViewProfile}
            />
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