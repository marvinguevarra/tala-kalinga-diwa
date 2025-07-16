import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SearchSection } from "@/components/search-section";
import { CategoryCards } from "@/components/category-cards";
import { FeaturedProfiles } from "@/components/featured-profiles";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <CategoryCards />
        <FeaturedProfiles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
