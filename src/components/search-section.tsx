import { SearchBar } from "@/components/ui/search-bar";
import { Badge } from "@/components/ui/badge";

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
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Implement search functionality
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

        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search) => (
                <Badge
                  key={search}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}