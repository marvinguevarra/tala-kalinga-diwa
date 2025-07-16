import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { SearchSection } from "@/components/search-section";
import { CategoryCards } from "@/components/category-cards";
import { FeaturedProfiles } from "@/components/featured-profiles";
import { Footer } from "@/components/footer";
import { ContentfulDebug } from "@/components/contentful-debug";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <ContentfulDebug />
        </div>
        <SearchSection />
        <CategoryCards />
        <FeaturedProfiles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
