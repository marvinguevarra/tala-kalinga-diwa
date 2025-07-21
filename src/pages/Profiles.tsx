import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Profiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Inspiring Profiles
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore stories of remarkable individuals who have shaped our world through their achievements, innovations, and contributions to society.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for profiles, achievements, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              1,247 Profiles
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Under Construction Notice */}
        <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Profile Directory Coming Soon</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're building an incredible collection of inspiring profiles from around the world. Soon you'll be able to discover stories of innovators, leaders, artists, and changemakers who have shaped our society.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-medium text-primary">What to expect:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Advanced search and filtering</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Interactive profile cards</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Category-based browsing</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span>Detailed biographical information</span>
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
      </div>
    </div>
  );
}