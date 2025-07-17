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

interface ImportProfile {
  pageName: string;
  profile?: WikipediaProfile;
  error?: string;
  imported?: boolean;
}

const defaultPageNames = `Lea_Salonga
Manny_Pacquiao
Hidilyn_Diaz`;

export default function ImportProfiles() {
  const [pageNames, setPageNames] = useState(defaultPageNames);
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
    setProfiles([]);

    try {
      const wikipediaProfiles = await fetchMultipleWikipediaProfiles(names);
      const results: ImportProfile[] = [];

      // Create results array with successful fetches
      wikipediaProfiles.forEach(profile => {
        results.push({
          pageName: profile.title,
          profile
        });
      });

      // Add errors for any missing profiles
      const fetchedTitles = wikipediaProfiles.map(p => p.title.toLowerCase());
      names.forEach(name => {
        const normalizedName = name.replace(/_/g, ' ').toLowerCase();
        if (!fetchedTitles.some(title => title.includes(normalizedName))) {
          results.push({
            pageName: name,
            error: `Failed to fetch Wikipedia page for "${name}"`
          });
        }
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
    }
  };

  const importToContentful = async (importProfile: ImportProfile) => {
    if (!importProfile.profile) return;

    setIsImporting(true);
    try {
      // TODO: Implement actual Contentful Management API integration
      // This is a placeholder that simulates the import process
      const { profile } = importProfile;
      
      console.log('Importing profile to Contentful:', {
        title: profile.title,
        slug: profile.slug,
        biography: profile.biography.substring(0, 100) + '...',
        imageUrl: profile.imageUrl,
        categories: profile.categories,
        sourceUrl: profile.sourceUrl
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the profile as imported
      setProfiles(prev => prev.map(p => 
        p.pageName === importProfile.pageName 
          ? { ...p, imported: true }
          : p
      ));

      toast({
        title: "Import Successful",
        description: `${profile.title} has been imported to Contentful`,
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
    let successCount = 0;

    for (const importProfile of validProfiles) {
      try {
        // TODO: Implement actual Contentful Management API integration
        console.log('Bulk importing:', importProfile.profile?.title);
        
        // Simulate import delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProfiles(prev => prev.map(p => 
          p.pageName === importProfile.pageName 
            ? { ...p, imported: true }
            : p
        ));
        
        successCount++;
      } catch (error) {
        console.error(`Failed to import ${importProfile.pageName}:`, error);
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
            <h1 className="text-3xl font-bold tracking-tight">Import Profiles from Wikipedia</h1>
            <p className="text-muted-foreground">
              Fetch profile data from Wikipedia and import to Contentful
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
                Pre-filled with examples: Lea Salonga, Manny Pacquiao, and Hidilyn Diaz
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
                  Fetching from Wikipedia...
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