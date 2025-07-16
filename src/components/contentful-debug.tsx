import { useEffect, useState } from 'react';
import { useContentful } from '@/integrations/contentful';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function ContentfulDebug() {
  const { client, isConnected, isLoading, error, retryConnection } = useContentful();
  const [spaceInfo, setSpaceInfo] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);

  const testConnection = async () => {
    if (!client) return;
    
    setTestLoading(true);
    try {
      const space = await client.getSpace();
      setSpaceInfo(space);
      console.log('Space info:', space);
    } catch (err) {
      console.error('Failed to get space info:', err);
      setSpaceInfo(null);
    } finally {
      setTestLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && client) {
      testConnection();
    }
  }, [isConnected, client]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isConnected ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          Contentful Connection Status
        </CardTitle>
        <CardDescription>
          Real-time status of your Contentful integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Client Available:</strong> {client ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Space ID:</strong> {spaceInfo?.sys?.id || 'Unknown'}
          </div>
        </div>

        {spaceInfo && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Space Information</h4>
            <div className="text-sm space-y-1">
              <div><strong>Name:</strong> {spaceInfo.name}</div>
              <div><strong>ID:</strong> {spaceInfo.sys.id}</div>
              <div><strong>Environment:</strong> {spaceInfo.sys.environment?.sys?.id || 'master'}</div>
              <div><strong>Created:</strong> {new Date(spaceInfo.sys.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={retryConnection} disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Retry Connection'}
          </Button>
          <Button 
            variant="outline" 
            onClick={testConnection} 
            disabled={!client || testLoading}
          >
            {testLoading ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}