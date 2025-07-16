# SearchFilter Component Documentation

## Overview
The `SearchFilter` component is an advanced search interface with Filipino design elements, providing comprehensive filtering and search capabilities for the influential Filipinos database.

## Features

### 🎨 **Filipino Design Elements**
- Custom Filipino Sun icon as search icon
- Category pills with Philippine flag-inspired colors
- Subtle animations and Filipino cultural patterns
- Responsive design with mobile-first approach

### 🔍 **Search Functionality**
- Real-time autocomplete with 300ms debouncing
- Full-text search across names, taglines, and achievements
- Category filtering with visual pills
- Multiple sort options (Name A-Z/Z-A, Recently Added, Most Viewed)
- Results count display with loading states

### 📱 **Responsive Design**
- Collapsible filters on mobile devices
- Adaptive layout for all screen sizes
- Touch-friendly interactive elements
- Optimized for mobile search experience

### 🔗 **URL Integration**
- Search parameters synced to URL for shareable searches
- Deep linking support for search states
- Browser back/forward navigation support

## Usage

```tsx
import { SearchFilter } from "@/components/ui/search-filter";

function MySearchPage() {
  const handleSearch = (filters: SearchFilters) => {
    console.log("Search filters:", filters);
    // Implement your search logic here
  };

  return (
    <SearchFilter 
      onSearch={handleSearch}
      resultsCount={42}
      loading={false}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | `(filters: SearchFilters) => void` | - | Callback fired when search filters change |
| `resultsCount` | `number` | `0` | Number of search results to display |
| `loading` | `boolean` | `false` | Loading state for search operations |

## SearchFilters Interface

```tsx
interface SearchFilters {
  query: string;     // Search query text
  category: string;  // Selected category filter
  sortBy: string;    // Sort option (name-asc, name-desc, recent, popular)
}
```

## Supabase Integration

### Setting Up Full-Text Search

To integrate with Supabase, you'll need to:

1. **Enable Full-Text Search** in your Supabase database:
```sql
-- Create full-text search index
CREATE INDEX profiles_fts_idx ON profiles 
USING gin(to_tsvector('english', name || ' ' || tagline || ' ' || array_to_string(achievements, ' ')));
```

2. **Update the useSearch hook** with actual Supabase queries:
```tsx
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .textSearch('fts', filters.query, {
    type: 'websearch',
    config: 'english'
  })
  .eq(filters.category !== 'All' ? 'category' : 'id', filters.category !== 'All' ? filters.category : 'id')
  .order(getSortColumn(filters.sortBy), { ascending: getSortDirection(filters.sortBy) });
```

3. **Set up autocomplete queries**:
```tsx
const { data: suggestions } = await supabase
  .from('profiles')
  .select('id, name, category')
  .ilike('name', `%${query}%`)
  .limit(8);
```

### Database Schema

Recommended Supabase table structure:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  achievements TEXT[],
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  fts TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', name || ' ' || COALESCE(tagline, '') || ' ' || array_to_string(COALESCE(achievements, '{}'), ' '))
  ) STORED
);
```

## Customization

### Category Colors
Modify the `categoryColors` object in the component to customize category badge colors:

```tsx
const categoryColors = {
  "Historical Figures": "bg-filipino-red/20 text-filipino-red border-filipino-red/30",
  "Arts & Entertainment": "bg-accent/20 text-accent-foreground border-accent/30",
  // Add your custom categories
};
```

### Sort Options
Add custom sort options by modifying the `sortOptions` array:

```tsx
const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "custom-sort", label: "Your Custom Sort" }
];
```

## Accessibility

- Keyboard navigation support
- Screen reader friendly labels
- Focus management for modals
- ARIA attributes for complex interactions

## Performance

- Debounced search (300ms) to reduce API calls
- Optimized re-renders with React.memo where appropriate
- Lazy loading for autocomplete suggestions
- URL state management to prevent unnecessary searches

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers