import { Asset, Entry, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Base Contentful entry type
export interface ContentfulEntry<T extends EntrySkeletonType = any> extends Entry<T> {}

// Simplified entry type for our app
export interface SimpleEntry {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: string;
        linkType: string;
        type: string;
      };
    };
  };
  fields: any;
}

// Media Asset
export interface MediaAssetFields {
  title: string;
  description?: string;
  file: Asset;
  altText?: string;
  caption?: string;
}

export type MediaAsset = SimpleEntry & { fields: MediaAssetFields };

// Category
export interface CategoryFields {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  count?: number;
}

export type Category = SimpleEntry & { fields: CategoryFields };

// Timeline Event
export interface TimelineEventFields {
  title: string;
  date: string;
  description?: Document;
  category?: Category;
  featured?: boolean;
  media?: MediaAsset[];
}

export type TimelineEvent = SimpleEntry & { fields: TimelineEventFields };

// Person (main profile)
export interface PersonFields {
  name: string;
  slug: string;
  tagline?: string;
  biography?: Document;
  profileImage?: MediaAsset;
  category: Category;
  achievements?: string[];
  timelineEvents?: TimelineEvent[];
  featured?: boolean;
  viewCount?: number;
  birthDate?: string;
  deathDate?: string;
  nationality?: string;
  occupation?: string[];
  keywords?: string[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  gallery?: MediaAsset[];
}

export type Person = SimpleEntry & { fields: PersonFields };

// Collection types for API responses
export interface ContentfulCollection<T> {
  total: number;
  skip: number;
  limit: number;
  items: T[];
}

// Query parameters
export interface ContentfulQuery {
  content_type?: string;
  limit?: number;
  skip?: number;
  order?: string;
  'fields.slug'?: string;
  'fields.featured'?: boolean;
  'fields.category.sys.id'?: string;
  'sys.id[in]'?: string;
  q?: string;
  include?: number;
  locale?: string;
}

// Environment configuration
export interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  previewAccessToken?: string;
  environment?: string;
  host?: string;
}

// Error types
export class ContentfulError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'ContentfulError';
  }
}

export class ContentfulConfigError extends ContentfulError {
  constructor(message: string) {
    super(message);
    this.name = 'ContentfulConfigError';
  }
}