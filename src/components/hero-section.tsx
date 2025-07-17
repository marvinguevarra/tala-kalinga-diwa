import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-banner.jpg";
const featuredPersonalities = [{
  id: 1,
  name: "José Rizal",
  title: "National Hero & Polymath",
  description: "Writer, doctor, and revolutionary who inspired Philippine independence through his novels and writings.",
  category: "Historical Figures",
  achievements: "Wrote Noli Me Tangere and El Filibusterismo"
}, {
  id: 2,
  name: "Lea Salonga",
  title: "International Broadway Star",
  description: "Tony Award-winning actress and singer known for Miss Saigon and voice of Disney's Mulan.",
  category: "Arts & Entertainment",
  achievements: "First Asian to win Tony Award for Best Actress"
}, {
  id: 3,
  name: "Manny Pacquiao",
  title: "Boxing Legend & Senator",
  description: "Eight-division world champion boxer and former Philippine Senator.",
  category: "Sports",
  achievements: "Only boxer to win titles in eight weight divisions"
}];
export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredPersonalities.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % featuredPersonalities.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + featuredPersonalities.length) % featuredPersonalities.length);
  };
  const currentPerson = featuredPersonalities[currentIndex];
  return <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }}>
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              100 Influential
              <span className="block text-accent"> Filipinos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Celebrating the remarkable achievements and lasting impact of Filipinos and the Filipino diaspora worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                Explore Profiles
              </Button>
              <Button variant="outline" size="lg" className="border-white hover:bg-white text-slate-900">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Side - Featured Person Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Card className="bg-white/95 backdrop-blur-sm border-none shadow-filipino p-8 w-full min-h-[400px]">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-accent fill-current" />
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Featured Profile
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {currentPerson.name}
                </h3>
                
                <p className="text-primary font-semibold mb-3">
                  {currentPerson.title}
                </p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {currentPerson.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Category:</span>
                    <span className="text-muted-foreground">{currentPerson.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Key Achievement:</span>
                    <span className="text-muted-foreground">{currentPerson.achievements}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-primary text-primary-foreground">
                  View Full Profile
                </Button>
              </Card>

              {/* Navigation Controls - Positioned relative to the card container */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
                <Button variant="outline" size="icon" onClick={prevSlide} className="bg-white/90 border-none shadow-lg hover:bg-white px-0 mx-0">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                <Button variant="outline" size="icon" onClick={nextSlide} className="bg-white/90 border-none shadow-lg hover:bg-white my-0">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {featuredPersonalities.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-accent shadow-gold' : 'bg-white/50 hover:bg-white/75'}`} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Sun Pattern */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
        <div className="w-full h-full rounded-full bg-accent/30 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-accent/70" />
          </div>
        </div>
      </div>
    </section>;
}