import { Asset } from 'contentful';
import { MediaAsset } from './types';

// Utility to get optimized image URL from Contentful
export function getImageUrl(
  asset: Asset | MediaAsset | undefined,
  options?: {
    width?: number;
    height?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    quality?: number;
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
    focus?: 'center' | 'top' | 'right' | 'left' | 'bottom' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'face' | 'faces';
  }
): string | undefined {
  if (!asset) return undefined;

  // Handle both Asset and MediaAsset types
  const file = 'fields' in asset ? (asset as any).fields?.file : (asset as any).fields?.file;
  const url = file?.url;

  if (!url) return undefined;

  // Ensure URL is absolute
  const baseUrl = url.startsWith('//') ? `https:${url}` : url;

  if (!options) return baseUrl;

  const params = new URLSearchParams();

  if (options.width) params.append('w', options.width.toString());
  if (options.height) params.append('h', options.height.toString());
  if (options.format) params.append('fm', options.format);
  if (options.quality) params.append('q', options.quality.toString());
  if (options.fit) params.append('fit', options.fit);
  if (options.focus) params.append('f', options.focus);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// Utility to get responsive image URLs
export function getResponsiveImageUrls(asset: Asset | MediaAsset | undefined) {
  if (!asset) return {};

  return {
    small: getImageUrl(asset, { width: 400, format: 'webp', quality: 80 }),
    medium: getImageUrl(asset, { width: 800, format: 'webp', quality: 85 }),
    large: getImageUrl(asset, { width: 1200, format: 'webp', quality: 90 }),
    original: getImageUrl(asset),
  };
}

// Utility to get image alt text
export function getImageAlt(asset: Asset | MediaAsset | undefined): string {
  if (!asset) return '';

  const assetFields = (asset as any).fields;
  if (!assetFields) return 'Image';

  return assetFields.altText || assetFields.title || assetFields.description || 'Image';
}

// Utility to check if content is published
export function isPublished(entry: any): boolean {
  return entry?.sys?.publishedAt !== undefined;
}

// Utility to format dates from Contentful
export function formatContentfulDate(dateString: string | undefined): Date | undefined {
  if (!dateString) return undefined;
  return new Date(dateString);
}

// Utility to extract plain text from rich text
export function extractPlainText(richText: any): string {
  if (!richText || !richText.content) return '';

  function extractFromNode(node: any): string {
    if (node.nodeType === 'text') {
      return node.value || '';
    }

    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractFromNode).join('');
    }

    return '';
  }

  return richText.content.map(extractFromNode).join(' ').trim();
}

// Utility to create a slug from text
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Utility to truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Utility to get content type from entry
export function getContentType(entry: any): string | undefined {
  return entry?.sys?.contentType?.sys?.id;
}

// Utility to get entry ID
export function getEntryId(entry: any): string | undefined {
  return entry?.sys?.id;
}

// Utility to transform Contentful entry to app format
export function transformPersonEntry(entry: any) {
  return {
    id: getEntryId(entry),
    name: entry.fields?.name || '',
    slug: entry.fields?.slug || '',
    image_url: getImageUrl(entry.fields?.profileImage),
    category: entry.fields?.category?.fields?.name || '',
    tagline: entry.fields?.tagline || '',
    achievements: entry.fields?.achievements || [],
    created_at: entry.sys?.createdAt,
    view_count: entry.fields?.viewCount || 0,
  };
}

// Utility to validate required fields
export function validateRequiredFields<T>(
  entry: any,
  requiredFields: (keyof T)[]
): boolean {
  return requiredFields.every(field => {
    const value = entry.fields?.[field];
    return value !== undefined && value !== null && value !== '';
  });
}