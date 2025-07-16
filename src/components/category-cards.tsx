import { 
  Crown, 
  Palette, 
  Trophy, 
  Briefcase, 
  Stethoscope, 
  Gavel,
  Lightbulb,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "historical",
    name: "Historical Figures",
    description: "Heroes and leaders who shaped Philippine history",
    icon: Crown,
    count: 15,
    color: "bg-filipino-red/10 hover:bg-filipino-red/20"
  },
  {
    id: "arts",
    name: "Arts & Entertainment",
    description: "Creative minds in music, film, literature, and visual arts",
    icon: Palette,
    count: 20,
    color: "bg-accent/10 hover:bg-accent/20"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Athletic champions who brought glory to the Philippines",
    icon: Trophy,
    count: 12,
    color: "bg-primary/10 hover:bg-primary/20"
  },
  {
    id: "business",
    name: "Business & Innovation",
    description: "Entrepreneurs and innovators driving economic growth",
    icon: Briefcase,
    count: 18,
    color: "bg-filipino-blue/10 hover:bg-filipino-blue/20"
  },
  {
    id: "science",
    name: "Science & Medicine",
    description: "Researchers and medical professionals advancing humanity",
    icon: Stethoscope,
    count: 10,
    color: "bg-filipino-gold/10 hover:bg-filipino-gold/20"
  },
  {
    id: "politics",
    name: "Politics & Law",
    description: "Leaders in government and legal profession",
    icon: Gavel,
    count: 8,
    color: "bg-destructive/10 hover:bg-destructive/20"
  },
  {
    id: "education",
    name: "Education & Academia",
    description: "Educators and scholars sharing knowledge",
    icon: Lightbulb,
    count: 9,
    color: "bg-secondary/50 hover:bg-secondary/70"
  },
  {
    id: "advocacy",
    name: "Social Advocacy",
    description: "Champions of human rights and social causes",
    icon: Users,
    count: 8,
    color: "bg-muted hover:bg-muted/80"
  }
];

export function CategoryCards() {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover influential Filipinos across various fields and their remarkable contributions to society
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className={`group cursor-pointer transition-all duration-300 hover:shadow-filipino border-2 hover:border-primary/20 ${category.color}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <span>{category.count} Profiles</span>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    >
                      Explore Category
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
}