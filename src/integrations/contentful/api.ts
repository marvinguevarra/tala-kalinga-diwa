import { getClient, shouldUseContentful } from './client';
import { mockData } from './mock-data';
import type { Entry } from 'contentful';

// Helper functions for data fetching with mock fallback
export async function getAllPeople(): Promise<Entry<any>[]> {
  if (!(await shouldUseContentful())) {
    console.log('Using mock data for people');
    return mockData.getAllPeople().items as any;
  }

  try {
    const client = await getClient();
    const response = await client.getEntries({
      content_type: 'person',
      include: 2,
      order: ['-sys.createdAt']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching people from Contentful, falling back to mock data:', error);
    return mockData.getAllPeople().items as any;
  }
}

export async function getPersonBySlug(slug: string): Promise<Entry<any> | null> {
  if (!(await shouldUseContentful())) {
    console.log('Using mock data for person:', slug);
    return mockData.getPersonBySlug(slug) as any;
  }

  try {
    const client = await getClient();
    const response = await client.getEntries({
      content_type: 'person',
      'fields.slug': slug,
      include: 2,
      limit: 1
    });
    
    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching person from Contentful, falling back to mock data:', error);
    return mockData.getPersonBySlug(slug) as any;
  }
}

export async function getAllCategories(): Promise<Entry<any>[]> {
  if (!(await shouldUseContentful())) {
    console.log('Using mock data for categories');
    return mockData.getAllCategories().items as any;
  }

  try {
    const client = await getClient();
    const response = await client.getEntries({
      content_type: 'category',
      order: ['fields.name']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching categories from Contentful, falling back to mock data:', error);
    return mockData.getAllCategories().items as any;
  }
}

export async function getPeopleByCategory(categorySlug: string): Promise<Entry<any>[]> {
  if (!(await shouldUseContentful())) {
    console.log('Using mock data for people by category:', categorySlug);
    return mockData.getPeopleByCategory(categorySlug).items as any;
  }

  try {
    const client = await getClient();
    
    // First get the category by slug
    const categoryResponse = await client.getEntries({
      content_type: 'category',
      'fields.slug': categorySlug,
      limit: 1
    });
    
    if (categoryResponse.items.length === 0) {
      throw new Error(`Category with slug '${categorySlug}' not found`);
    }
    
    const category = categoryResponse.items[0];
    
    // Then get people in that category
    const response = await client.getEntries({
      content_type: 'person',
      'fields.category.sys.id': category.sys.id,
      include: 2,
      order: ['-sys.createdAt']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching people by category from Contentful, falling back to mock data:', error);
    return mockData.getPeopleByCategory(categorySlug).items as any;
  }
}

export async function searchPeople(query: string): Promise<Entry<any>[]> {
  if (!(await shouldUseContentful())) {
    console.log('Using mock data for search:', query);
    return mockData.searchPeople(query).items as any;
  }

  try {
    const client = await getClient();
    const response = await client.getEntries({
      content_type: 'person',
      query: query,
      include: 2,
      limit: 50
    });
    
    return response.items;
  } catch (error) {
    console.error('Error searching people in Contentful, falling back to mock data:', error);
    return mockData.searchPeople(query).items as any;
  }
}

export async function getFeaturedPeople(limit: number = 6): Promise<Entry<any>[]> {
  if (!(await shouldUseContentful())) {
    console.log('Using mock data for featured people');
    return mockData.getFeaturedPeople(limit).items as any;
  }

  try {
    const client = await getClient();
    const response = await client.getEntries({
      content_type: 'person',
      'fields.featured': true,
      include: 2,
      limit,
      order: ['-sys.createdAt']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching featured people from Contentful, falling back to mock data:', error);
    return mockData.getFeaturedPeople(limit).items as any;
  }
}