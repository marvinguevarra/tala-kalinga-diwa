import { useState, useEffect } from 'react';

// Types for search functionality
export interface SearchFilters {
  query: string;
  category: string;
  sortBy: string;
}

export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  achievements: string[];
  image_url: string;
  created_at: string;
  view_count?: number;
}

export interface SearchSuggestion {
  id: string;
  name: string;
  category: string;
  type: 'person' | 'category';
}

// Mock data for demonstration - replace with actual Supabase queries
const mockResults: SearchResult[] = [
  {
    id: "1",
    name: "José Rizal",
    slug: "jose-rizal",
    category: "Historical Figures",
    tagline: "National hero and polymath who inspired Philippine independence",
    achievements: [
      "Wrote Noli Me Tangere and El Filibusterismo",
      "Executed for rebellion against Spanish rule",
      "Polyglot who spoke 22 languages"
    ],
    image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face",
    created_at: "2024-01-01",
    view_count: 1523
  },
  {
    id: "2",
    name: "Lea Salonga",
    slug: "lea-salonga",
    category: "Arts & Entertainment",
    tagline: "Tony Award-winning actress and international Broadway star",
    achievements: [
      "First Asian to win Tony Award for Best Actress",
      "Voice of Disney's Mulan and Jasmine",
      "Miss Saigon original cast member"
    ],
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=face",
    created_at: "2024-01-02",
    view_count: 987
  }
];

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search function - replace with Supabase full-text search
  const search = async (filters: SearchFilters): Promise<SearchResult[]> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Supabase query
      // Example Supabase query:
      // const { data, error } = await supabase
      //   .from('profiles')
      //   .select('*')
      //   .textSearch('name, tagline, achievements', filters.query, {
      //     type: 'websearch',
      //     config: 'english'
      //   })
      //   .eq(filters.category !== 'All' ? 'category' : 'id', filters.category !== 'All' ? filters.category : 'id')
      //   .order(getSortColumn(filters.sortBy), { ascending: getSortDirection(filters.sortBy) });

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      let filteredResults = [...mockResults];

      // Apply text search filter
      if (filters.query) {
        filteredResults = filteredResults.filter(result =>
          result.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          result.tagline.toLowerCase().includes(filters.query.toLowerCase()) ||
          result.achievements.some(achievement =>
            achievement.toLowerCase().includes(filters.query.toLowerCase())
          )
        );
      }

      // Apply category filter
      if (filters.category !== 'All') {
        filteredResults = filteredResults.filter(result =>
          result.category === filters.category
        );
      }

      // Apply sorting
      filteredResults.sort((a, b) => {
        switch (filters.sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'recent':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case 'popular':
            return (b.view_count || 0) - (a.view_count || 0);
          default:
            return 0;
        }
      });

      setResults(filteredResults);
      return filteredResults;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Autocomplete function - replace with Supabase query
  const getAutocompleteSuggestions = async (query: string): Promise<SearchSuggestion[]> => {
    if (query.length < 2) return [];

    try {
      // TODO: Replace with actual Supabase query
      // Example Supabase query:
      // const { data: people } = await supabase
      //   .from('profiles')
      //   .select('id, name, category')
      //   .ilike('name', `%${query}%`)
      //   .limit(5);
      // 
      // const { data: categories } = await supabase
      //   .from('profiles')
      //   .select('category')
      //   .ilike('category', `%${query}%`)
      //   .limit(3);

      const mockSuggestions: SearchSuggestion[] = [
        { id: "1", name: "José Rizal", category: "Historical Figures", type: "person" as const },
        { id: "2", name: "Lea Salonga", category: "Arts & Entertainment", type: "person" as const },
        { id: "artists", name: "Artists", category: "Arts & Entertainment", type: "category" as const }
      ].filter(suggestion =>
        suggestion.name.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(mockSuggestions);
      return mockSuggestions;
    } catch (err) {
      console.error('Autocomplete failed:', err);
      return [];
    }
  };

  return {
    results,
    suggestions,
    loading,
    error,
    search,
    getAutocompleteSuggestions
  };
}

// Helper functions for Supabase sorting
function getSortColumn(sortBy: string): string {
  switch (sortBy) {
    case 'name-asc':
    case 'name-desc':
      return 'name';
    case 'recent':
      return 'created_at';
    case 'popular':
      return 'view_count';
    default:
      return 'name';
  }
}

function getSortDirection(sortBy: string): boolean {
  switch (sortBy) {
    case 'name-asc':
      return true;
    case 'name-desc':
    case 'recent':
    case 'popular':
      return false;
    default:
      return true;
  }
}