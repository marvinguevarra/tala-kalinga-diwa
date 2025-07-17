import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader, AlertCircle, CheckCircle, Download, Upload, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AuthGuard } from "@/components/auth-guard";
import { fetchMultipleWikipediaProfiles, WikipediaProfile } from "@/utils/wikipedia-fetcher";
import { createPersonFromWikipedia, createMultiplePeopleFromWikipedia } from "@/integrations/contentful/management";

interface ImportProfile {
  pageName: string;
  profile?: WikipediaProfile;
  error?: string;
  imported?: boolean;
}

const defaultPageNames = `Lea_Salonga
Manny_Pacquiao
Hidilyn_Diaz
Jose_Rizal
Corazon_Aquino
Fe_del_Mundo
Nick_Joaquin`;

export default function ImportProfiles() {
  const [pageNames, setPageNames] = useState(defaultPageNames);
  const [profiles, setProfiles] = useState<ImportProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [fetchingProgress, setFetchingProgress] = useState({ current: 0, total: 0 });
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
    setProfiles([]);
    setFetchingProgress({ current: 0, total: names.length });

    try {
      // Fetch profiles one by one to show progress
      const wikipediaProfiles: WikipediaProfile[] = [];
      const errors: string[] = [];

      for (let i = 0; i < names.length; i++) {
        setFetchingProgress({ current: i + 1, total: names.length });
        
        try {
          const { fetchWikipediaProfile } = await import("@/utils/wikipedia-fetcher");
          const profile = await fetchWikipediaProfile(names[i]);
          wikipediaProfiles.push(profile);
        } catch (error) {
          errors.push(names[i]);
          console.error(`Failed to fetch ${names[i]}:`, error);
        }
      }
      const results: ImportProfile[] = [];

      // Create results array with successful fetches
      wikipediaProfiles.forEach(profile => {
        results.push({
          pageName: profile.title,
          profile
        });
      });

      // Add errors for failed fetches
      errors.forEach(name => {
        results.push({
          pageName: name,
          error: `Failed to fetch Wikipedia page for "${name}"`
        });
      });

      setProfiles(results);

      const successCount = results.filter(p => p.profile).length;
      const errorCount = results.filter(p => p.error).length;

      toast({
        title: "Wikipedia Fetch Complete",
        description: `Successfully fetched ${successCount} profiles. ${errorCount} errors.`,
      });
    } catch (error) {
      toast({
        title: "Fetch Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setFetchingProgress({ current: 0, total: 0 });
    }
  };

  const importToContentful = async (importProfile: ImportProfile) => {
    if (!importProfile.profile) return;

    setIsImporting(true);
    try {
      await createPersonFromWikipedia(importProfile.profile);
      
      // Update the profile as imported
      setProfiles(prev => prev.map(p => 
        p.pageName === importProfile.pageName 
          ? { ...p, imported: true }
          : p
      ));

      toast({
        title: "Import Successful",
        description: `${importProfile.profile.title} has been imported to Contentful`,
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
    const validProfiles = profiles.filter(p => p.profile && !p.imported);
    
    if (validProfiles.length === 0) {
      toast({
        title: "No Profiles to Import",
        description: "All valid profiles have already been imported",
      });
      return;
    }

    setIsImporting(true);
    
    try {
      const wikipediaProfiles = validProfiles
        .map(p => p.profile!)
        .filter(Boolean);
      
      const results = await createMultiplePeopleFromWikipedia(wikipediaProfiles);
      
      // Update the profiles as imported based on successful results
      setProfiles(prev => prev.map(p => {
        if (p.profile && results.successful.includes(p.profile.title)) {
          return { ...p, imported: true };
        }
        return p;
      }));

      toast({
        title: "Bulk Import Complete",
        description: `Successfully imported ${results.successful.length} out of ${validProfiles.length} profiles. ${results.failed.length} failed.`,
      });

      if (results.failed.length > 0) {
        console.error('Failed imports:', results.failed);
      }
    } catch (error) {
      toast({
        title: "Bulk Import Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AuthGuard requireAdmin>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Import Profiles from Wikipedia</h1>
            <p className="text-muted-foreground">
              Enter Wikipedia page names (one per line) for Filipino personalities you want to import
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
                placeholder="Enter Wikipedia page names (use underscores for spaces)..."
                value={pageNames}
                onChange={(e) => setPageNames(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Pre-filled with examples of notable Filipino personalities. Use underscores for spaces in page names.
              </p>
            </div>
            
            <Button 
              onClick={fetchFromWikipedia} 
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {fetchingProgress.total > 0 
                    ? `Fetching ${fetchingProgress.current} of ${fetchingProgress.total}...`
                    : "Fetching from Wikipedia..."
                  }
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
                {profiles.some(p => p.profile && !p.imported) && (
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
                {profiles.map((importProfile, index) => (
                  <Card key={index} className="border-l-4 border-l-primary/20">
                    <CardContent className="pt-4">
                      {importProfile.error ? (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{importProfile.pageName}:</strong> {importProfile.error}
                          </AlertDescription>
                        </Alert>
                      ) : importProfile.profile ? (
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{importProfile.profile.title}</h3>
                                {importProfile.imported ? (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Imported
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Ready to Import</Badge>
                                )}
                              </div>
                              
                              {importProfile.profile.description && (
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  {importProfile.profile.description}
                                </p>
                              )}
                              
                              <p className="text-sm leading-relaxed mb-3">
                                {importProfile.profile.biography.length > 300
                                  ? `${importProfile.profile.biography.substring(0, 300)}...`
                                  : importProfile.profile.biography}
                              </p>
                              
                              {importProfile.profile.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {importProfile.profile.categories.slice(0, 3).map((category, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {category}
                                    </Badge>
                                  ))}
                                  {importProfile.profile.categories.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{importProfile.profile.categories.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {importProfile.profile.imageUrl && (
                              <img
                                src={importProfile.profile.imageUrl}
                                alt={importProfile.profile.title}
                                className="w-24 h-24 object-cover rounded-lg ml-4 flex-shrink-0"
                              />
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <a
                              href={importProfile.profile.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline flex items-center gap-1"
                            >
                              View on Wikipedia <ExternalLink className="w-3 h-3" />
                            </a>
                            
                            {!importProfile.imported && (
                              <Button
                                onClick={() => importToContentful(importProfile)}
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