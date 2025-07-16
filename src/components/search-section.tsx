import { SearchFilter } from "@/components/ui/search-filter";
import { useState } from "react";

const popularSearches = [
  "José Rizal",
  "Lea Salonga", 
  "Manny Pacquiao",
  "Fe del Mundo",
  "Bruno Mars",
  "Carlos Romulo",
  "Artists",
  "Scientists",
  "Athletes"
];

export function SearchSection() {
  const [resultsCount, setResultsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSearch = (filters: { query: string; category: string; sortBy: string }) => {
    console.log("Searching with filters:", filters);
    setLoading(true);
    
    // TODO: Replace with actual Supabase search
    setTimeout(() => {
      // Mock results count based on query
      const mockCount = filters.query ? Math.floor(Math.random() * 50) + 1 : 100;
      setResultsCount(mockCount);
      setLoading(false);
    }, 800);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Inspiration
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search through our comprehensive collection of influential Filipinos by name, field, or achievement
          </p>
        </div>

        <SearchFilter 
          onSearch={handleSearch}
          resultsCount={resultsCount}
          loading={loading}
        />
      </div>
    </section>
  );
}