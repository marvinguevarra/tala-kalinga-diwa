interface WikipediaPageInfo {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  pageimage?: string;
  description?: string;
  categories?: string[];
  coordinates?: {
    lat: number;
    lon: number;
  };
}

interface WikipediaApiResponse {
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        title: string;
        extract: string;
        thumbnail?: {
          source: string;
          width: number;
          height: number;
        };
        pageimage?: string;
        description?: string;
        categories?: Array<{ title: string }>;
        coordinates?: Array<{ lat: number; lon: number }>;
      };
    };
  };
}

export interface WikipediaProfile {
  title: string;
  slug: string;
  biography: string;
  imageUrl?: string;
  description?: string;
  categories: string[];
  coordinates?: {
    lat: number;
    lon: number;
  };
  sourceUrl: string;
}

class WikipediaFetcher {
  private static instance: WikipediaFetcher;
  private cache = new Map<string, WikipediaProfile>();
  private lastRequestTime = 0;
  private readonly rateLimitMs = 1000; // 1 second between requests
  private readonly baseUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
  private readonly apiUrl = 'https://en.wikipedia.org/w/api.php';
  private readonly userAgent = '100Filipinos/1.0 (contact@example.com)';

  private constructor() {}

  static getInstance(): WikipediaFetcher {
    if (!WikipediaFetcher.instance) {
      WikipediaFetcher.instance = new WikipediaFetcher();
    }
    return WikipediaFetcher.instance;
  }

  private async rateLimitedRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.rateLimitMs) {
      const waitTime = this.rateLimitMs - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  private cleanCategories(categories: Array<{ title: string }> = []): string[] {
    return categories
      .map(cat => cat.title.replace('Category:', ''))
      .filter(cat => 
        !cat.includes('births') &&
        !cat.includes('deaths') &&
        !cat.includes('living people') &&
        !cat.includes('pages') &&
        cat.length > 3
      )
      .slice(0, 5); // Limit to 5 most relevant categories
  }

  async fetchProfile(pageName: string): Promise<WikipediaProfile> {
    // Check cache first
    const cacheKey = pageName.toLowerCase();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    await this.rateLimitedRequest();

    try {
      // Fetch detailed page info using MediaWiki API
      const apiParams = new URLSearchParams({
        action: 'query',
        format: 'json',
        titles: pageName.replace(/_/g, ' '),
        prop: 'extracts|pageimages|categories|coordinates|description',
        exintro: 'true',
        explaintext: 'true',
        exsectionformat: 'plain',
        piprop: 'thumbnail',
        pithumbsize: '300',
        clshow: '!hidden',
        cllimit: '20',
        origin: '*'
      });

      const response = await fetch(`${this.apiUrl}?${apiParams}`, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Wikipedia API error: ${response.status} ${response.statusText}`);
      }

      const data: WikipediaApiResponse = await response.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId === '-1') {
        throw new Error(`Wikipedia page "${pageName}" not found`);
      }

      const page = pages[pageId];
      
      if (!page.extract || page.extract.trim().length === 0) {
        throw new Error(`No content found for Wikipedia page "${pageName}"`);
      }

      const profile: WikipediaProfile = {
        title: page.title,
        slug: this.generateSlug(page.title),
        biography: page.extract,
        imageUrl: page.thumbnail?.source,
        description: page.description,
        categories: this.cleanCategories(page.categories),
        coordinates: page.coordinates?.[0] ? {
          lat: page.coordinates[0].lat,
          lon: page.coordinates[0].lon
        } : undefined,
        sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(pageName)}`
      };

      // Cache the result
      this.cache.set(cacheKey, profile);
      
      return profile;
    } catch (error) {
      console.error('Error fetching Wikipedia profile:', error);
      throw new Error(
        error instanceof Error 
          ? `Failed to fetch Wikipedia profile: ${error.message}`
          : 'Failed to fetch Wikipedia profile'
      );
    }
  }

  async fetchMultipleProfiles(pageNames: string[]): Promise<WikipediaProfile[]> {
    const profiles: WikipediaProfile[] = [];
    const errors: Array<{ pageName: string; error: string }> = [];

    for (const pageName of pageNames) {
      try {
        const profile = await this.fetchProfile(pageName.trim());
        profiles.push(profile);
      } catch (error) {
        errors.push({
          pageName,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    if (errors.length > 0) {
      console.warn('Some profiles failed to fetch:', errors);
    }

    return profiles;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const wikipediaFetcher = WikipediaFetcher.getInstance();

// Export utility functions
export async function fetchWikipediaProfile(pageName: string): Promise<WikipediaProfile> {
  return wikipediaFetcher.fetchProfile(pageName);
}

export async function fetchMultipleWikipediaProfiles(pageNames: string[]): Promise<WikipediaProfile[]> {
  return wikipediaFetcher.fetchMultipleProfiles(pageNames);
}