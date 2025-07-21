import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Clock, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Star,
  TrendingUp,
  History
} from "lucide-react";

const timelinePreviews = [
  {
    era: "Ancient Times",
    period: "3000 BCE - 500 CE",
    color: "bg-amber-500",
    profileCount: 45,
    description: "Philosophers, rulers, and foundational figures of civilization"
  },
  {
    era: "Middle Ages",
    period: "500 - 1500 CE",
    color: "bg-purple-500",
    profileCount: 67,
    description: "Knights, scholars, and religious leaders who shaped medieval society"
  },
  {
    era: "Renaissance",
    period: "1400 - 1700 CE",
    color: "bg-blue-500",
    profileCount: 89,
    description: "Artists, scientists, and thinkers of the great cultural rebirth"
  },
  {
    era: "Industrial Age",
    period: "1700 - 1900 CE",
    color: "bg-green-500",
    profileCount: 156,
    description: "Inventors, industrialists, and revolutionaries of the modern era"
  },
  {
    era: "Modern Era",
    period: "1900 - 2000 CE",
    color: "bg-red-500",
    profileCount: 234,
    description: "Leaders, innovators, and changemakers of the 20th century"
  },
  {
    era: "Digital Age",
    period: "2000 - Present",
    color: "bg-orange-500",
    profileCount: 178,
    description: "Tech pioneers, social media influencers, and contemporary leaders"
  }
];

export default function Timeline() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Journey Through Time
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore the stories of remarkable individuals across different eras and witness how their contributions have shaped the course of human history.
          </p>
          
          <div className="flex justify-center items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">3000 BCE - Present</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Global Coverage</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="text-sm">769 Profiles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Interactive Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Timeline</h3>
              <p className="text-sm text-muted-foreground">Navigate through history with an immersive, interactive timeline experience</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Era Connections</h3>
              <p className="text-sm text-muted-foreground">Discover how figures from different periods influenced each other</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Historical Context</h3>
              <p className="text-sm text-muted-foreground">Rich historical context and background for each era and profile</p>
            </CardContent>
          </Card>
        </div>

        {/* Under Construction Notice */}
        <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 mb-12">
          <CardContent className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Interactive Timeline Coming Soon</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're creating an immersive timeline experience that will let you explore the connections between historical figures, major events, and cultural movements across different eras. Navigate through time and discover how these remarkable individuals influenced the world around them.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-medium text-primary">Features in development:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Zoomable timeline interface</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Era-based filtering</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Historical event markers</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Cross-referential connections</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link to="/profile-demo">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    View Sample Profile
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Era Preview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Historical Eras Preview</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30"></div>
            
            <div className="space-y-8">
              {timelinePreviews.map((era, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-16 h-16 ${era.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {index + 1}
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{era.era}</CardTitle>
                          <p className="text-muted-foreground text-sm">{era.period}</p>
                        </div>
                        <Badge variant="outline" className="w-fit">
                          {era.profileCount} profiles
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{era.description}</p>
                      <Button variant="ghost" size="sm" className="group">
                        Explore Era
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}