import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContentfulClient } from './provider';
import { ContentfulError } from './types';
import type { Entry, EntryCollection } from 'contentful';

// Query keys factory
export const contentfulKeys = {
  all: ['contentful'] as const,
  persons: () => [...contentfulKeys.all, 'persons'] as const,
  person: (slug: string) => [...contentfulKeys.persons(), slug] as const,
  categories: () => [...contentfulKeys.all, 'categories'] as const,
  category: (slug: string) => [...contentfulKeys.categories(), slug] as const,
  timelineEvents: () => [...contentfulKeys.all, 'timeline-events'] as const,
  mediaAssets: () => [...contentfulKeys.all, 'media-assets'] as const,
  search: (query: string) => [...contentfulKeys.all, 'search', query] as const,
};

// Error handler
function handleContentfulError(error: any): ContentfulError {
  if (error instanceof ContentfulError) {
    return error;
  }
  return new ContentfulError('An error occurred while fetching content', error);
}

// Hook to fetch all persons
export function usePersons(query?: Record<string, any>) {
  const client = useContentfulClient();

  return useQuery({
    queryKey: [...contentfulKeys.persons(), query],
    queryFn: async () => {
      try {
        const response = await client.getEntries({
          content_type: 'person',
          include: 2,
          ...query,
        });
        return response;
      } catch (error) {
        throw handleContentfulError(error);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to fetch a single person by slug
export function usePerson(slug: string) {
  const client = useContentfulClient();

  return useQuery({
    queryKey: contentfulKeys.person(slug),
    queryFn: async () => {
      try {
        const response = await client.getEntries({
          content_type: 'person',
          'fields.slug': slug,
          include: 3,
          limit: 1,
        });
        return response.items[0] || null;
      } catch (error) {
        throw handleContentfulError(error);
      }
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to fetch featured persons
export function useFeaturedPersons(limit = 6) {
  return usePersons({
    'fields.featured': true,
    limit,
    order: '-sys.createdAt',
  });
}

// Hook to fetch all categories
export function useCategories(query?: Record<string, any>) {
  const client = useContentfulClient();

  return useQuery({
    queryKey: [...contentfulKeys.categories(), query],
    queryFn: async () => {
      try {
        const response = await client.getEntries({
          content_type: 'category',
          order: ['fields.name'],
          ...query,
        });
        return response;
      } catch (error) {
        throw handleContentfulError(error);
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook to fetch a single category by slug
export function useCategory(slug: string) {
  const client = useContentfulClient();

  return useQuery({
    queryKey: contentfulKeys.category(slug),
    queryFn: async () => {
      try {
        const response = await client.getEntries({
          content_type: 'category',
          'fields.slug': slug,
          limit: 1,
        });
        return response.items[0] || null;
      } catch (error) {
        throw handleContentfulError(error);
      }
    },
    enabled: !!slug,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook to fetch persons by category
export function usePersonsByCategory(categoryId: string, query?: Record<string, any>) {
  return usePersons({
    'fields.category.sys.id': categoryId,
    ...query,
  });
}

// Hook to fetch timeline events
export function useTimelineEvents(query?: Record<string, any>) {
  const client = useContentfulClient();

  return useQuery({
    queryKey: [...contentfulKeys.timelineEvents(), query],
    queryFn: async () => {
      try {
        const response = await client.getEntries({
          content_type: 'timelineEvent',
          order: ['-fields.date'],
          include: 2,
          ...query,
        });
        return response;
      } catch (error) {
        throw handleContentfulError(error);
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to search across content
export function useSearch(searchQuery: string, contentTypes?: string[]) {
  const client = useContentfulClient();

  return useQuery({
    queryKey: contentfulKeys.search(searchQuery),
    queryFn: async () => {
      try {
        const promises = (contentTypes || ['person', 'category']).map(contentType =>
          client.getEntries({
            content_type: contentType,
            query: searchQuery,
            include: 1,
            limit: 20,
          })
        );

        const responses = await Promise.all(promises);
        return responses.flatMap(response => response.items);
      } catch (error) {
        throw handleContentfulError(error);
      }
    },
    enabled: !!searchQuery && searchQuery.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook to prefetch related content
export function usePrefetchContent() {
  const queryClient = useQueryClient();
  const client = useContentfulClient();

  const prefetchPerson = async (slug: string) => {
    await queryClient.prefetchQuery({
      queryKey: contentfulKeys.person(slug),
      queryFn: async () => {
        const response = await client.getEntries({
          content_type: 'person',
          'fields.slug': slug,
          include: 3,
          limit: 1,
        });
        return response.items[0] || null;
      },
      staleTime: 10 * 60 * 1000,
    });
  };

  const prefetchCategory = async (slug: string) => {
    await queryClient.prefetchQuery({
      queryKey: contentfulKeys.category(slug),
      queryFn: async () => {
        const response = await client.getEntries({
          content_type: 'category',
          'fields.slug': slug,
          limit: 1,
        });
        return response.items[0] || null;
      },
      staleTime: 15 * 60 * 1000,
    });
  };

  return {
    prefetchPerson,
    prefetchCategory,
  };
}

// Hook to invalidate cache
export function useInvalidateContent() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: contentfulKeys.all });
  };

  const invalidatePersons = () => {
    queryClient.invalidateQueries({ queryKey: contentfulKeys.persons() });
  };

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: contentfulKeys.categories() });
  };

  return {
    invalidateAll,
    invalidatePersons,
    invalidateCategories,
  };
}