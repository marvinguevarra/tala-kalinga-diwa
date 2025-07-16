import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Globe, 
  Share2, 
  Copy, 
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileCard } from "@/components/ui/profile-card";
import { useToast } from "@/hooks/use-toast";

// Baybayin Script Component for decorative elements
const BaybayinScript = ({ text, className }: { text: string; className?: string }) => (
  <div className={`font-serif text-accent/30 select-none ${className}`}>
    {/* Simplified Baybayin-inspired decorative text */}
    <span className="tracking-widest">{text.split('').map((_, i) => '᜵').join('')}</span>
  </div>
);

// Traditional Pattern Border Component
const TraditionalPattern = ({ className }: { className?: string }) => (
  <div 
    className={`h-2 bg-gradient-to-r from-filipino-gold via-filipino-red to-filipino-blue opacity-20 ${className}`}
    style={{
      backgroundImage: `repeating-linear-gradient(
        45deg,
        hsl(var(--filipino-gold)) 0px,
        hsl(var(--filipino-gold)) 4px,
        transparent 4px,
        transparent 8px,
        hsl(var(--filipino-red)) 8px,
        hsl(var(--filipino-red)) 12px,
        transparent 12px,
        transparent 16px
      )`
    }}
  />
);

interface ProfileData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  image_url: string;
  birthplace: string;
  birth_year: number | null;
  current_location: string;
  biography: string;
  achievements: Array<{
    year: number;
    title: string;
    description: string;
  }>;
  gallery_images: string[];
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface ProfilePageProps {
  profileData: ProfileData;
  relatedProfiles?: ProfileData[];
  onViewRelatedProfile?: (slug: string) => void;
}

export function ProfilePage({ profileData, relatedProfiles = [], onViewRelatedProfile }: ProfilePageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const allImages = [profileData.image_url, ...profileData.gallery_images];

  // Copy profile link to clipboard
  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Unable to copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  // Social share functions
  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${profileData.name} - ${profileData.tagline}`);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(prev => 
          prev === null ? null : prev > 0 ? prev - 1 : allImages.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(prev => 
          prev === null ? null : prev < allImages.length - 1 ? prev + 1 : 0
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, allImages.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={profileData.image_url}
            alt={profileData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        {/* Decorative Baybayin Elements */}
        <BaybayinScript 
          text="influence" 
          className="absolute top-10 right-10 text-6xl opacity-10" 
        />
        <BaybayinScript 
          text="legacy" 
          className="absolute bottom-20 left-10 text-4xl opacity-10" 
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white"
            >
              <Badge className="mb-4 bg-accent text-accent-foreground">
                {profileData.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {profileData.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl italic">
                {profileData.tagline}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute top-12 right-0 z-50"
                >
                  <Card className="w-48 shadow-lg border">
                    <CardContent className="p-3 space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyProfileLink}
                        className="w-full justify-start"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy Link
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareOnSocial('facebook')}
                        className="w-full justify-start"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareOnSocial('twitter')}
                        className="w-full justify-start"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareOnSocial('linkedin')}
                        className="w-full justify-start"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Traditional Pattern Border */}
      <TraditionalPattern />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Quick Facts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-foreground">Quick Facts</h3>
                <div className="space-y-4">
                  {profileData.birthplace && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-filipino-red mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Birthplace</p>
                        <p className="text-sm text-muted-foreground">{profileData.birthplace}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileData.birth_year && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-filipino-blue mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Born</p>
                        <p className="text-sm text-muted-foreground">{profileData.birth_year}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileData.current_location && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-filipino-gold mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Current Location</p>
                        <p className="text-sm text-muted-foreground">{profileData.current_location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {Object.keys(profileData.social_links).length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h4 className="font-semibold text-sm mb-3 text-foreground">Connect</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.social_links.website && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={profileData.social_links.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Website
                            </a>
                          </Button>
                        )}
                        {profileData.social_links.facebook && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={profileData.social_links.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Facebook className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {profileData.social_links.twitter && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={profileData.social_links.twitter} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {profileData.social_links.instagram && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={profileData.social_links.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Instagram className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {profileData.social_links.linkedin && (
                          <Button variant="outline" size="sm" asChild>
                            <a 
                              href={profileData.social_links.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">
            {/* Biography Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-foreground">Biography</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                {profileData.biography.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>

            {/* Timeline Section */}
            {profileData.achievements.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-foreground">Timeline</h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-filipino-gold via-filipino-red to-filipino-blue" />
                  
                  <div className="space-y-8">
                    {profileData.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="relative pl-12"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-2 top-2 w-4 h-4 bg-accent rounded-full border-2 border-background shadow-lg" />
                        
                        <Card className="hover:shadow-filipino transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="text-accent border-accent">
                                {achievement.year}
                              </Badge>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-foreground">
                              {achievement.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {achievement.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* Photo Gallery */}
            {profileData.gallery_images.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-foreground">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${profileData.name} - Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg hover:shadow-lg transition-shadow"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>

      {/* Related Profiles Section */}
      {relatedProfiles.length > 0 && (
        <section className="bg-gradient-subtle py-16">
          <TraditionalPattern className="mb-16" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                Related Profiles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {relatedProfiles.slice(0, 3).map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    person={{
                      id: profile.id,
                      name: profile.name,
                      slug: profile.slug,
                      image_url: profile.image_url,
                      category: profile.category as any,
                      tagline: profile.tagline,
                      achievements: profile.achievements.map(a => a.title)
                    }}
                    onViewProfile={onViewRelatedProfile || (() => {})}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[selectedImageIndex]}
                alt={`${profileData.name} - Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === null ? null : prev > 0 ? prev - 1 : allImages.length - 1
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === null ? null : prev < allImages.length - 1 ? prev + 1 : 0
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Close Button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
                onClick={() => setSelectedImageIndex(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}