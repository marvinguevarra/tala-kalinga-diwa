import { createClient } from 'contentful';
import type { ContentfulClientApi } from 'contentful';
import { ContentfulConfig, ContentfulConfigError } from './types';

// Environment configuration - Using your actual Contentful credentials
const CONTENTFUL_SPACE_ID = '9imvaxxd1mhv';
const CONTENTFUL_ACCESS_TOKEN = 'CFPAT-XVjsoBzaT_6uBd3QHd_jMIsla7EMNCfnPyVPvCfDuEk';
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = 'CFPAT-XVjsoBzaT_6uBd3QHd_jMIsla7EMNCfnPyVPvCfDuEk';
const CONTENTFUL_ENVIRONMENT = 'master';

let client: ContentfulClientApi<undefined> | null = null;
let previewClient: ContentfulClientApi<undefined> | null = null;

function validateConfig(): ContentfulConfig {
  if (!CONTENTFUL_SPACE_ID) {
    throw new ContentfulConfigError(
      'Contentful Space ID is required. Please set CONTENTFUL_SPACE_ID environment variable.'
    );
  }

  if (!CONTENTFUL_ACCESS_TOKEN) {
    throw new ContentfulConfigError(
      'Contentful Access Token is required. Please set CONTENTFUL_ACCESS_TOKEN environment variable.'
    );
  }

  return {
    spaceId: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
    previewAccessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    environment: CONTENTFUL_ENVIRONMENT,
  };
}

export function createContentfulClient(preview = false): ContentfulClientApi<undefined> {
  const config = validateConfig();

  if (preview && !config.previewAccessToken) {
    console.warn('Preview token not provided, falling back to published content');
    return getContentfulClient(false);
  }

  const clientConfig = {
    space: config.spaceId,
    accessToken: preview ? config.previewAccessToken! : config.accessToken,
    environment: config.environment || 'master',
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  };

  return createClient(clientConfig);
}

export function getContentfulClient(preview = false): ContentfulClientApi<undefined> {
  if (preview) {
    if (!previewClient) {
      previewClient = createContentfulClient(true);
    }
    return previewClient;
  }

  if (!client) {
    client = createContentfulClient(false);
  }
  return client;
}

// Utility function to check if we're in development mode
export function isDevelopment(): boolean {
  return import.meta.env.MODE === 'development';
}

// Helper to get the appropriate client based on environment
export function getClient(): ContentfulClientApi<undefined> {
  // In development, you might want to use preview content
  const usePreview = isDevelopment() && !!CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  return getContentfulClient(usePreview);
}

// Test connection
export async function testConnection(preview = false): Promise<boolean> {
  try {
    const testClient = getContentfulClient(preview);
    await testClient.getSpace();
    return true;
  } catch (error) {
    console.error('Contentful connection test failed:', error);
    return false;
  }
}