import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ContentfulClientApi } from 'contentful';
import { getClient, testConnection } from './client';
import { ContentfulConfigError } from './types';

interface ContentfulContextType {
  client: ContentfulClientApi<undefined> | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  retryConnection: () => Promise<void>;
}

const ContentfulContext = createContext<ContentfulContextType | undefined>(undefined);

export interface ContentfulProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ContentfulProvider({ children, fallback }: ContentfulProviderProps) {
  const [client, setClient] = useState<ContentfulClientApi<undefined> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeClient = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const contentfulClient = getClient();
      const connected = await testConnection();

      if (connected) {
        setClient(contentfulClient);
        setIsConnected(true);
      } else {
        throw new Error('Failed to connect to Contentful');
      }
    } catch (err) {
      const errorMessage = err instanceof ContentfulConfigError 
        ? err.message 
        : 'Failed to initialize Contentful client. Please check your configuration.';
      
      setError(errorMessage);
      setIsConnected(false);
      console.error('Contentful initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const retryConnection = async () => {
    await initializeClient();
  };

  useEffect(() => {
    initializeClient();
  }, []);

  const contextValue: ContentfulContextType = {
    client,
    isConnected,
    isLoading,
    error,
    retryConnection,
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Connecting to Contentful...</p>
        </div>
      </div>
    );
  }

  // Show error state with fallback option
  if (error && !isConnected) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-destructive text-xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold mb-2">Contentful Connection Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={retryConnection}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry Connection
          </button>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Please check your Contentful configuration in the environment variables.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ContentfulContext.Provider value={contextValue}>
      {children}
    </ContentfulContext.Provider>
  );
}

export function useContentful(): ContentfulContextType {
  const context = useContext(ContentfulContext);
  if (context === undefined) {
    throw new Error('useContentful must be used within a ContentfulProvider');
  }
  return context;
}

// Hook to get the client directly (with error handling)
export function useContentfulClient(): ContentfulClientApi<undefined> {
  const { client, isConnected, error } = useContentful();
  
  if (!isConnected || !client) {
    throw new Error(error || 'Contentful client not available');
  }
  
  return client;
}