import { createClient } from 'contentful-management';
import type { ClientAPI, Environment } from 'contentful-management';
import { ContentfulConfigError } from './types';
import { supabase } from '@/integrations/supabase/client';
import { WikipediaProfile } from '@/utils/wikipedia-fetcher';

// Cache for configuration and client
let managementClient: ClientAPI | null = null;
let environment: Environment | null = null;

// Fetch Contentful configuration from Supabase edge function
async function fetchContentfulConfig() {
  try {
    console.log('Fetching Contentful config for management API...');
    const { data, error } = await supabase.functions.invoke('get-contentful-config');
    
    if (error) {
      throw new ContentfulConfigError(`Failed to fetch Contentful config: ${error.message}`);
    }

    if (data?.error) {
      throw new ContentfulConfigError(data.error);
    }

    if (!data?.spaceId || !data?.accessToken) {
      throw new ContentfulConfigError('Invalid Contentful configuration received');
    }

    return data;
  } catch (error) {
    console.error('Error fetching Contentful config:', error);
    if (error instanceof ContentfulConfigError) {
      throw error;
    }
    throw new ContentfulConfigError('Failed to fetch Contentful configuration from server');
  }
}

// Get or create management client
async function getManagementClient(): Promise<ClientAPI> {
  if (!managementClient) {
    const config = await fetchContentfulConfig();
    managementClient = createClient({
      accessToken: config.accessToken,
    });
  }
  return managementClient;
}

// Get or create environment
async function getEnvironment(): Promise<Environment> {
  if (!environment) {
    const config = await fetchContentfulConfig();
    const client = await getManagementClient();
    const space = await client.getSpace(config.spaceId);
    environment = await space.getEnvironment(config.environment || 'master');
  }
  return environment;
}

// Check if a person with the given slug already exists
export async function checkPersonExists(slug: string): Promise<boolean> {
  try {
    const env = await getEnvironment();
    const entries = await env.getEntries({
      content_type: 'person',
      'fields.slug': slug,
      limit: 1
    });
    return entries.items.length > 0;
  } catch (error) {
    console.error('Error checking if person exists:', error);
    return false;
  }
}

// Get the "Historical Figures" category or create it if it doesn't exist
async function getOrCreateHistoricalFiguresCategory(): Promise<string> {
  try {
    const env = await getEnvironment();
    
    // First, try to find existing category
    const existingCategories = await env.getEntries({
      content_type: 'category',
      'fields.slug': 'historical-figures',
      limit: 1
    });

    if (existingCategories.items.length > 0) {
      return existingCategories.items[0].sys.id;
    }

    // Create new category if it doesn't exist
    const categoryEntry = await env.createEntry('category', {
      fields: {
        name: { 'en-US': 'Historical Figures' },
        slug: { 'en-US': 'historical-figures' },
        description: { 'en-US': 'Notable historical figures and personalities from the Philippines' },
        icon: { 'en-US': 'users' },
        color: { 'en-US': '#8B5CF6' }
      }
    });

    await categoryEntry.publish();
    return categoryEntry.sys.id;
  } catch (error) {
    console.error('Error getting/creating Historical Figures category:', error);
    throw new Error('Failed to get or create Historical Figures category');
  }
}

// Create a new person entry in Contentful from Wikipedia profile
export async function createPersonFromWikipedia(profile: WikipediaProfile): Promise<void> {
  try {
    // Check if person already exists
    const exists = await checkPersonExists(profile.slug);
    if (exists) {
      throw new Error(`A person with slug "${profile.slug}" already exists in Contentful`);
    }

    const env = await getEnvironment();
    const categoryId = await getOrCreateHistoricalFiguresCategory();

    // Create the person entry
    const personEntry = await env.createEntry('person', {
      fields: {
        name: { 'en-US': profile.title },
        slug: { 'en-US': profile.slug },
        tagline: { 'en-US': profile.description || `Notable Filipino personality` },
        biography: {
          'en-US': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: profile.biography,
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        category: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: categoryId
            }
          }
        },
        featured: { 'en-US': false },
        nationality: { 'en-US': 'Filipino' },
        keywords: { 'en-US': profile.categories }
      }
    });

    // Publish the entry
    await personEntry.publish();
    
    console.log(`Successfully created person entry for ${profile.title}`);
  } catch (error) {
    console.error('Error creating person in Contentful:', error);
    throw error;
  }
}

// Bulk create multiple people from Wikipedia profiles
export async function createMultiplePeopleFromWikipedia(profiles: WikipediaProfile[]): Promise<{
  successful: string[];
  failed: Array<{ name: string; error: string }>;
}> {
  const successful: string[] = [];
  const failed: Array<{ name: string; error: string }> = [];

  for (const profile of profiles) {
    try {
      await createPersonFromWikipedia(profile);
      successful.push(profile.title);
    } catch (error) {
      failed.push({
        name: profile.title,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return { successful, failed };
}