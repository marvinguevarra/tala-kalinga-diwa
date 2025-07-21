import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Crown, 
  Palette, 
  Briefcase, 
  BookOpen, 
  Users, 
  Zap, 
  Heart,
  ChevronRight,
  Layers
} from "lucide-react";

const categoryData = [
  {
    icon: Crown,
    name: "Historical Figures",
    description: "Leaders, revolutionaries, and influential personalities from history",
    color: "bg-amber-500",
    profileCount: 234,
    featured: true
  },
  {
    icon: Palette,
    name: "Artists & Creators",
    description: "Painters, musicians, writers, and creative visionaries",
    color: "bg-purple-500",
    profileCount: 156,
    featured: true
  },
  {
    icon: Briefcase,
    name: "Business Leaders",
    description: "Entrepreneurs, innovators, and industry pioneers",
    color: "bg-blue-500",
    profileCount: 189,
    featured: false
  },
  {
    icon: BookOpen,
    name: "Scientists & Scholars",
    description: "Researchers, academics, and intellectual trailblazers",
    color: "bg-green-500",
    profileCount: 127,
    featured: true
  },
  {
    icon: Users,
    name: "Social Activists",
    description: "Champions of change and advocates for justice",
    color: "bg-red-500",
    profileCount: 98,
    featured: false
  },
  {
    icon: Zap,
    name: "Innovators",
    description: "Technology pioneers and disruptive thinkers",
    color: "bg-orange-500",
    profileCount: 143,
    featured: false
  },
  {
    icon: Heart,
    name: "Humanitarians",
    description: "Philanthropists and those dedicated to helping others",
    color: "bg-pink-500",
    profileCount: 67,
    featured: false
  }
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore by Category
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover inspiring stories organized by field, profession, and area of impact. Each category showcases individuals who have made significant contributions to their respective domains.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-primary mb-2">1,014</div>
              <div className="text-sm text-muted-foreground">Total Profiles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Featured Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Under Construction Notice */}
        <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 mb-12">
          <CardContent className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Layers className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Category System in Development</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're organizing our extensive collection of profiles into intuitive categories. Each category will offer curated content, detailed filtering options, and insights into the individuals who have shaped their respective fields.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link to="/profiles">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Browse All Profiles
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {category.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {category.profileCount} profiles
                    </Badge>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Explore
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}