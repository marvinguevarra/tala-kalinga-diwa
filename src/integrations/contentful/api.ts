import { getClient } from './client';
import type { Entry } from 'contentful';

// Helper functions for data fetching
export async function getAllPeople(): Promise<Entry<any>[]> {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: 'person',
      include: 2,
      order: ['-sys.createdAt']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw new Error('Failed to fetch people from Contentful');
  }
}

export async function getPersonBySlug(slug: string): Promise<Entry<any> | null> {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: 'person',
      'fields.slug': slug,
      include: 2,
      limit: 1
    });
    
    return response.items[0] || null;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw new Error(`Failed to fetch person with slug: ${slug}`);
  }
}

export async function getAllCategories(): Promise<Entry<any>[]> {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: 'category',
      order: ['fields.name']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories from Contentful');
  }
}

export async function getPeopleByCategory(categorySlug: string): Promise<Entry<any>[]> {
  try {
    const client = getClient();
    
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
    console.error('Error fetching people by category:', error);
    throw new Error(`Failed to fetch people for category: ${categorySlug}`);
  }
}

export async function searchPeople(query: string): Promise<Entry<any>[]> {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: 'person',
      query: query,
      include: 2,
      limit: 50
    });
    
    return response.items;
  } catch (error) {
    console.error('Error searching people:', error);
    throw new Error(`Failed to search people with query: ${query}`);
  }
}

export async function getFeaturedPeople(limit: number = 6): Promise<Entry<any>[]> {
  try {
    const client = getClient();
    const response = await client.getEntries({
      content_type: 'person',
      'fields.featured': true,
      include: 2,
      limit,
      order: ['-sys.createdAt']
    });
    
    return response.items;
  } catch (error) {
    console.error('Error fetching featured people:', error);
    throw new Error('Failed to fetch featured people from Contentful');
  }
}