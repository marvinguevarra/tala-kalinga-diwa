import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown, Filter, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Filipino Sun Icon Component
const FilipinoSunIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1m19.07-10.07l-4.24 4.24M7.17 16.83l-4.24 4.24M22.07 19.07l-4.24-4.24M7.17 7.17L2.93 2.93" />
    <path d="M12 5.5l1 3h3l-2.5 2 1 3L12 11l-2.5 2.5 1-3L8 8.5h3l1-3z" />
  </svg>
);

const categories = [
  "All",
  "Historical Figures",
  "Arts & Entertainment", 
  "Sports",
  "Business & Innovation",
  "Science & Medicine",
  "Politics & Law",
  "Education & Academia",
  "Social Advocacy"
];

const categoryColors = {
  "All": "bg-muted text-muted-foreground border-muted",
  "Historical Figures": "bg-filipino-red/20 text-filipino-red border-filipino-red/30",
  "Arts & Entertainment": "bg-accent/20 text-accent-foreground border-accent/30",
  "Sports": "bg-primary/20 text-primary border-primary/30",
  "Business & Innovation": "bg-filipino-blue/20 text-filipino-blue border-filipino-blue/30",
  "Science & Medicine": "bg-filipino-gold/20 text-filipino-gold border-filipino-gold/30",
  "Politics & Law": "bg-destructive/20 text-destructive border-destructive/30",
  "Education & Academia": "bg-secondary/50 text-secondary-foreground border-secondary",
  "Social Advocacy": "bg-muted/70 text-muted-foreground border-muted"
};

const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "recent", label: "Recently Added" },
  { value: "popular", label: "Most Viewed" }
];

// Mock autocomplete data - replace with Supabase query
const mockSuggestions = [
  { id: "1", name: "José Rizal", category: "Historical Figures", type: "person" },
  { id: "2", name: "Lea Salonga", category: "Arts & Entertainment", type: "person" },
  { id: "3", name: "Manny Pacquiao", category: "Sports", type: "person" },
  { id: "4", name: "Bruno Mars", category: "Arts & Entertainment", type: "person" },
  { id: "5", name: "Fe del Mundo", category: "Science & Medicine", type: "person" },
  { id: "artists", name: "Artists", category: "Arts & Entertainment", type: "category" },
  { id: "scientists", name: "Scientists", category: "Science & Medicine", type: "category" }
];

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  resultsCount?: number;
  loading?: boolean;
}

interface SearchFilters {
  query: string;
  category: string;
  sortBy: string;
}

export function SearchFilter({ onSearch, resultsCount = 0, loading = false }: SearchFiltersProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof mockSuggestions>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // Update URL parameters
      const url = new URL(window.location.href);
      if (query) url.searchParams.set('q', query);
      else url.searchParams.delete('q');
      if (selectedCategory !== 'All') url.searchParams.set('category', selectedCategory);
      else url.searchParams.delete('category');
      if (sortBy !== 'name-asc') url.searchParams.set('sort', sortBy);
      else url.searchParams.delete('sort');
      
      window.history.replaceState({}, '', url.toString());

      // Trigger search
      onSearch({ query, category: selectedCategory, sortBy });
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, selectedCategory, sortBy, onSearch]);

  // Load from URL parameters on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlQuery = url.searchParams.get('q') || '';
    const urlCategory = url.searchParams.get('category') || 'All';
    const urlSort = url.searchParams.get('sort') || 'name-asc';
    
    setQuery(urlQuery);
    setSelectedCategory(urlCategory);
    setSortBy(urlSort);
  }, []);

  // Mock autocomplete - replace with Supabase search
  useEffect(() => {
    if (query.length >= 2) {
      const filtered = mockSuggestions.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowAutocomplete(true);
    } else {
      setSuggestions([]);
      setShowAutocomplete(false);
    }
  }, [query]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearFilters = () => {
    setQuery("");
    setSelectedCategory("All");
    setSortBy("name-asc");
    
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    url.searchParams.delete('category');
    url.searchParams.delete('sort');
    window.history.replaceState({}, '', url.toString());
  };

  const hasActiveFilters = query || selectedCategory !== "All" || sortBy !== "name-asc";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Bar */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <FilipinoSunIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent" />
          <Input
            type="text"
            placeholder="Search influential Filipinos by name, achievement, or field..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg border-2 border-border focus:border-primary shadow-filipino rounded-xl"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        <AnimatePresence>
          {showAutocomplete && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="absolute top-full mt-2 w-full z-50 shadow-filipino border-2 border-border/50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => {
                        if (suggestion.type === 'person') {
                          setQuery(suggestion.name);
                        } else {
                          setSelectedCategory(suggestion.category);
                          setQuery("");
                        }
                        setShowAutocomplete(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <div>
                          <p className="font-medium text-foreground">{suggestion.name}</p>
                          <p className="text-sm text-muted-foreground">{suggestion.category}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.type === 'person' ? 'Person' : 'Category'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between md:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
        
        {resultsCount > 0 && (
          <span className="text-sm text-muted-foreground">
            {loading ? 'Searching...' : `${resultsCount} results`}
          </span>
        )}
      </div>

      {/* Filters Section */}
      <motion.div
        initial={false}
        animate={{ height: showFilters || window.innerWidth >= 768 ? 'auto' : 0 }}
        className="overflow-hidden md:overflow-visible"
      >
        <div className="space-y-4">
          {/* Category Pills */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                const colorClass = categoryColors[category as keyof typeof categoryColors];
                
                return (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                          : `${colorClass} hover:scale-105`
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Sort and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Results Count - Desktop */}
            {resultsCount > 0 && (
              <div className="hidden md:block text-sm text-muted-foreground">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </div>
                ) : (
                  `${resultsCount} ${resultsCount === 1 ? 'result' : 'results'} found`
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}