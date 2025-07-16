import { createClient } from 'contentful';
import type { ContentfulClientApi } from 'contentful';
import { ContentfulConfig, ContentfulConfigError } from './types';
import { supabase } from '@/integrations/supabase/client';

// Cache for configuration
let configCache: ContentfulConfig | null = null;
let client: ContentfulClientApi<undefined> | null = null;
let previewClient: ContentfulClientApi<undefined> | null = null;

// Fetch Contentful configuration from Supabase edge function
async function fetchContentfulConfig(): Promise<ContentfulConfig> {
  if (configCache) {
    return configCache;
  }

  try {
    const { data, error } = await supabase.functions.invoke('get-contentful-config');
    
    if (error) {
      throw new ContentfulConfigError(`Failed to fetch Contentful config: ${error.message}`);
    }

    if (data.error) {
      throw new ContentfulConfigError(data.error);
    }

    if (!data.spaceId || !data.accessToken) {
      throw new ContentfulConfigError('Invalid Contentful configuration received');
    }

    configCache = data;
    return configCache;
  } catch (error) {
    console.error('Error fetching Contentful config:', error);
    throw new ContentfulConfigError('Failed to fetch Contentful configuration from server');
  }
}

// Check if we should use Contentful
export async function shouldUseContentful(): Promise<boolean> {
  try {
    await fetchContentfulConfig();
    return true;
  } catch {
    return false;
  }
}

export async function createContentfulClient(preview = false): Promise<ContentfulClientApi<undefined>> {
  const config = await fetchContentfulConfig();

  if (preview && !config.previewAccessToken) {
    console.warn('Preview token not provided, falling back to published content');
    return await getContentfulClient(false);
  }

  const clientConfig = {
    space: config.spaceId,
    accessToken: preview ? config.previewAccessToken! : config.accessToken,
    environment: config.environment || 'master',
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  };

  return createClient(clientConfig);
}

export async function getContentfulClient(preview = false): Promise<ContentfulClientApi<undefined>> {
  if (preview) {
    if (!previewClient) {
      previewClient = await createContentfulClient(true);
    }
    return previewClient;
  }

  if (!client) {
    client = await createContentfulClient(false);
  }
  return client;
}

// Utility function to check if we're in development mode
export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}

// Helper to get the appropriate client based on environment
export async function getClient(): Promise<ContentfulClientApi<undefined>> {
  // For now, always use published content since we need to fetch config async
  return await getContentfulClient(false);
}

// Test connection
export async function testConnection(preview = false): Promise<boolean> {
  try {
    const testClient = await getContentfulClient(preview);
    await testClient.getSpace();
    return true;
  } catch (error) {
    console.error('Contentful connection test failed:', error);
    return false;
  }
}

// Get the current space ID for display purposes
export async function getSpaceId(): Promise<string | null> {
  try {
    const config = await fetchContentfulConfig();
    return config.spaceId;
  } catch {
    return null;
  }
}