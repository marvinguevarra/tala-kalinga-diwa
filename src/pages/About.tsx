import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Target, 
  Users, 
  Globe, 
  ChevronRight, 
  Mail,
  Github,
  Twitter,
  Lightbulb,
  Award,
  BookOpen
} from "lucide-react";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & Lead Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Passionate about preserving and sharing inspiring stories"
  },
  {
    name: "Maria Santos",
    role: "Content Curator",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", 
    description: "Expert in historical research and biographical documentation"
  },
  {
    name: "David Chen",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Creating intuitive experiences for discovering remarkable lives"
  }
];

const stats = [
  { label: "Profiles Created", value: "1,200+", icon: Users },
  { label: "Countries Covered", value: "150+", icon: Globe },
  { label: "Years of History", value: "5,000+", icon: BookOpen },
  { label: "User Contributions", value: "500+", icon: Heart }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About ProfileHub
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We believe that every remarkable life has lessons to teach and inspiration to offer. Our mission is to preserve and share the stories of individuals who have shaped our world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ProfileHub is dedicated to creating a comprehensive, accessible database of inspiring individuals from all walks of life. We aim to democratize access to knowledge about remarkable people who have contributed to human progress, creativity, and understanding.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through carefully curated profiles, we celebrate diversity in achievement and background, ensuring that stories from all cultures, eras, and fields of endeavor are preserved and shared with future generations.
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We envision a world where anyone, anywhere, can discover and learn from the experiences of extraordinary individuals. By making these stories accessible, we hope to inspire the next generation of leaders, innovators, and changemakers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform serves as a bridge between past and present, connecting historical figures with contemporary audiences and fostering a deeper understanding of human potential and achievement.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="text-center py-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Under Construction Notice */}
        <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 mb-16">
          <CardContent className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Community Features Coming Soon</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're building features that will allow our community to contribute, suggest, and collaborate on profile content. Soon you'll be able to submit profiles, fact-check information, and engage with other users who share your passion for remarkable stories.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-medium text-primary">What's coming:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>User-contributed profiles</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Community fact-checking</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Discussion forums</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Educational resources</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team brings together expertise in technology, research, design, and storytelling to create the best possible experience for discovering inspiring profiles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Mail className="h-6 w-6" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have suggestions for profiles to include? Found an error in our content? Want to contribute to our mission? We'd love to hear from you.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Button asChild>
                <Link to="/profiles">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Explore Profiles
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}