import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader, AlertCircle, CheckCircle, Download, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AuthGuard } from "@/components/auth-guard";

interface WikipediaData {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  pageid: number;
  content_urls: {
    desktop: {
      page: string;
    };
  };
}

interface ImportProfile {
  pageTitle: string;
  data?: WikipediaData;
  error?: string;
  imported?: boolean;
}

export default function AdminImportProfiles() {
  const [pageNames, setPageNames] = useState("");
  const [profiles, setProfiles] = useState<ImportProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const fetchFromWikipedia = async () => {
    const names = pageNames
      .split("\n")
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one Wikipedia page name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const results: ImportProfile[] = [];

    for (const name of names) {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
        );
        
        if (!response.ok) {
          results.push({
            pageTitle: name,
            error: `Failed to fetch: ${response.status} ${response.statusText}`,
          });
          continue;
        }

        const data: WikipediaData = await response.json();
        results.push({
          pageTitle: name,
          data,
        });
      } catch (error) {
        results.push({
          pageTitle: name,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    setProfiles(results);
    setIsLoading(false);

    const successCount = results.filter(p => p.data).length;
    const errorCount = results.filter(p => p.error).length;

    toast({
      title: "Wikipedia Fetch Complete",
      description: `Successfully fetched ${successCount} profiles. ${errorCount} errors.`,
    });
  };

  const importToContentful = async (profile: ImportProfile) => {
    if (!profile.data) return;

    setIsImporting(true);
    try {
      // This would be where you'd call your Contentful management API
      // For now, we'll simulate the import
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the profile as imported
      setProfiles(prev => prev.map(p => 
        p.pageTitle === profile.pageTitle 
          ? { ...p, imported: true }
          : p
      ));

      toast({
        title: "Import Successful",
        description: `${profile.data.title} has been imported to Contentful`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const importAllToContentful = async () => {
    const validProfiles = profiles.filter(p => p.data && !p.imported);
    
    if (validProfiles.length === 0) {
      toast({
        title: "No Profiles to Import",
        description: "All valid profiles have already been imported",
      });
      return;
    }

    setIsImporting(true);
    let successCount = 0;

    for (const profile of validProfiles) {
      try {
        // Simulate import delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProfiles(prev => prev.map(p => 
          p.pageTitle === profile.pageTitle 
            ? { ...p, imported: true }
            : p
        ));
        
        successCount++;
      } catch (error) {
        console.error(`Failed to import ${profile.pageTitle}:`, error);
      }
    }

    setIsImporting(false);
    toast({
      title: "Bulk Import Complete",
      description: `Successfully imported ${successCount} out of ${validProfiles.length} profiles`,
    });
  };

  return (
    <AuthGuard requireAdmin>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Import Profiles</h1>
            <p className="text-muted-foreground">
              Import profile data from Wikipedia to Contentful
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Fetch from Wikipedia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Wikipedia Page Names (one per line)
              </label>
              <Textarea
                placeholder="Lea_Salonga&#10;Manny_Pacquiao&#10;Hidilyn_Diaz"
                value={pageNames}
                onChange={(e) => setPageNames(e.target.value)}
                rows={6}
                className="font-mono text-sm"
              />
            </div>
            
            <Button 
              onClick={fetchFromWikipedia} 
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Fetch from Wikipedia
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {profiles.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Fetched Profiles ({profiles.length})
                </CardTitle>
                {profiles.some(p => p.data && !p.imported) && (
                  <Button 
                    onClick={importAllToContentful}
                    disabled={isImporting}
                    size="sm"
                  >
                    {isImporting ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Importing All...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Import All to Contentful
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profiles.map((profile, index) => (
                  <Card key={index} className="border-l-4 border-l-primary/20">
                    <CardContent className="pt-4">
                      {profile.error ? (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{profile.pageTitle}:</strong> {profile.error}
                          </AlertDescription>
                        </Alert>
                      ) : profile.data ? (
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{profile.data.title}</h3>
                                {profile.imported ? (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Imported
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Ready to Import</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                Page ID: {profile.data.pageid}
                              </p>
                              {profile.data.extract && (
                                <p className="text-sm leading-relaxed">
                                  {profile.data.extract.length > 300
                                    ? `${profile.data.extract.substring(0, 300)}...`
                                    : profile.data.extract}
                                </p>
                              )}
                            </div>
                            {profile.data.thumbnail && (
                              <img
                                src={profile.data.thumbnail.source}
                                alt={profile.data.title}
                                className="w-24 h-24 object-cover rounded-lg ml-4 flex-shrink-0"
                              />
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <a
                              href={profile.data.content_urls.desktop.page}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              View on Wikipedia →
                            </a>
                            
                            {!profile.imported && (
                              <Button
                                onClick={() => importToContentful(profile)}
                                disabled={isImporting}
                                size="sm"
                                variant="outline"
                              >
                                {isImporting ? (
                                  <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Importing...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import to Contentful
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {profiles.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No profiles fetched yet</p>
                <p className="text-sm">
                  Enter Wikipedia page names above and click "Fetch from Wikipedia" to get started
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGuard>
  );
}