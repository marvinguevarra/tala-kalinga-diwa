import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Category color mapping based on our design system
const categoryColors = {
  "Historical Figures": "bg-filipino-red/20 text-filipino-red border-filipino-red/30",
  "Arts & Entertainment": "bg-accent/20 text-accent-foreground border-accent/30",
  "Sports": "bg-primary/20 text-primary border-primary/30",
  "Business & Innovation": "bg-filipino-blue/20 text-filipino-blue border-filipino-blue/30",
  "Science & Medicine": "bg-filipino-gold/20 text-filipino-gold border-filipino-gold/30",
  "Politics & Law": "bg-destructive/20 text-destructive border-destructive/30",
  "Education & Academia": "bg-secondary/50 text-secondary-foreground border-secondary",
  "Social Advocacy": "bg-muted/70 text-muted-foreground border-muted"
};

interface Person {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  category: keyof typeof categoryColors;
  tagline: string;
  achievements: string[];
}

interface ProfileCardProps {
  person: Person;
  onViewProfile: (slug: string) => void;
  loading?: boolean;
}

export function ProfileCard({ person, onViewProfile, loading = false }: ProfileCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return <ProfileCardSkeleton />;
  }

  const categoryColorClass = categoryColors[person.category] || categoryColors["Social Advocacy"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="w-full max-w-[320px] mx-auto"
    >
      <Card className="group relative overflow-hidden bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-filipino h-[400px]">
        {/* Filipino-inspired border pattern on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, transparent 49%, hsl(var(--filipino-gold) / 0.2) 50%, transparent 51%),
                        linear-gradient(-45deg, transparent 49%, hsl(var(--filipino-blue) / 0.1) 50%, transparent 51%)`,
            backgroundSize: '8px 8px'
          }}
        />

        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-subtle animate-pulse" />
          )}
          
          {!imageError ? (
            <img
              src={person.image_url}
              alt={person.name}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-subtle flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {person.name.charAt(0)}
                  </span>
                </div>
                <p className="text-xs">Image unavailable</p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColorClass} font-medium text-xs border`}>
              {person.category}
            </Badge>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-6 h-[208px] flex flex-col">
          {/* Name */}
          <h3 className="font-bold text-xl text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {person.name}
          </h3>

          {/* Tagline */}
          <p className="text-muted-foreground italic text-sm mb-4 line-clamp-2">
            {person.tagline}
          </p>

          {/* Achievements */}
          <div className="flex-1 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-foreground">Key Achievements:</span>
            </div>
            <ul className="space-y-1">
              {person.achievements.slice(0, 3).map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-1 text-xs">•</span>
                  <span className="line-clamp-1">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* View Profile Button */}
          <Button
            onClick={() => onViewProfile(person.slug)}
            className="w-full group/btn bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            View Profile
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// Skeleton Loader Component
function ProfileCardSkeleton() {
  return (
    <div className="w-full max-w-[320px] mx-auto">
      <Card className="overflow-hidden bg-card border-2 border-border h-[400px]">
        {/* Image Skeleton */}
        <Skeleton className="h-48 w-full" />
        
        {/* Content Skeleton */}
        <div className="p-6 space-y-4">
          {/* Badge Skeleton */}
          <Skeleton className="h-5 w-20" />
          
          {/* Name Skeleton */}
          <Skeleton className="h-6 w-3/4" />
          
          {/* Tagline Skeleton */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          
          {/* Achievements Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          
          {/* Button Skeleton */}
          <Skeleton className="h-9 w-full" />
        </div>
      </Card>
    </div>
  );
}

export { ProfileCardSkeleton };