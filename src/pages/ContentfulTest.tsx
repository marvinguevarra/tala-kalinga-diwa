import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllPeople, getAllCategories, getPersonBySlug } from '@/integrations/contentful/api';
import type { Entry } from 'contentful';

const ContentfulTest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [people, setPeople] = useState<Entry<any>[]>([]);
  const [categories, setCategories] = useState<Entry<any>[]>([]);
  const [testPerson, setTestPerson] = useState<Entry<any> | null>(null);

  useEffect(() => {
    async function runTests() {
      try {
        setLoading(true);
        setError(null);

        console.log('🧪 Testing Contentful connection...');

        // Test 1: Fetch all categories
        console.log('📁 Fetching categories...');
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
        console.log('✅ Categories fetched:', categoriesData.length);

        // Test 2: Fetch all people
        console.log('👥 Fetching people...');
        const peopleData = await getAllPeople();
        setPeople(peopleData);
        console.log('✅ People fetched:', peopleData.length);

        // Test 3: Fetch a specific person by slug (if any exist)
        if (peopleData.length > 0) {
          const firstPersonSlug = String(peopleData[0].fields.slug);
          console.log('🔍 Fetching person by slug:', firstPersonSlug);
          const personData = await getPersonBySlug(firstPersonSlug);
          setTestPerson(personData);
          console.log('✅ Person by slug fetched:', String(personData?.fields.name || 'Unknown'));
        }

        console.log('🎉 All tests completed successfully!');
      } catch (err) {
        console.error('❌ Test failed:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    runTests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Testing Contentful Connection</h2>
          <p className="text-muted-foreground">Please wait while we verify the setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Contentful Integration Test</h1>
          <p className="text-muted-foreground">
            Testing connection and data fetching from Contentful CMS
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertCircle className="h-5 w-5 mr-2" />
                Connection Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{error}</p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Troubleshooting:</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Check that your Contentful space ID is correct</li>
                  <li>Verify your access token has the right permissions</li>
                  <li>Ensure your content types exist in Contentful</li>
                  <li>Run the setup script if you haven't already</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {!error && (
          <div className="grid gap-6">
            {/* Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Contentful Connection Successful
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Space ID:</span>
                    <code className="ml-2 px-2 py-1 bg-muted rounded">9imvaxxd1mhv</code>
                  </div>
                  <div>
                    <span className="font-medium">Environment:</span>
                    <code className="ml-2 px-2 py-1 bg-muted rounded">master</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories Test */}
            <Card>
              <CardHeader>
                <CardTitle>Categories ({categories.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {categories.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {categories.map((category) => (
                      <Badge key={category.sys.id} variant="secondary">
                        {String(category.fields.icon || '📁')} {String(category.fields.name || 'Unknown')}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No categories found. Run the setup script to create them.</p>
                )}
              </CardContent>
            </Card>

            {/* People Test */}
            <Card>
              <CardHeader>
                <CardTitle>People ({people.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {people.length > 0 ? (
                  <div className="space-y-4">
                    {people.slice(0, 3).map((person) => (
                      <div key={person.sys.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{String(person.fields.name || 'Unknown')}</h3>
                        <p className="text-sm text-muted-foreground">{String(person.fields.tagline || '')}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">
                            {person.fields.category && typeof person.fields.category === 'object' && 'fields' in person.fields.category 
                              ? String((person.fields.category.fields as any)?.name || 'No category')
                              : 'No category'}
                          </Badge>
                          {person.fields.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    {people.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        ...and {people.length - 3} more people
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No people found. Add some Person entries in your Contentful space.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Single Person Test */}
            {testPerson && (
              <Card>
                <CardHeader>
                  <CardTitle>Single Person Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div><strong>Name:</strong> {String(testPerson.fields.name || 'Unknown')}</div>
                    <div><strong>Slug:</strong> {String(testPerson.fields.slug || 'N/A')}</div>
                    {testPerson.fields.tagline && (
                      <div><strong>Tagline:</strong> {String(testPerson.fields.tagline)}</div>
                    )}
                    {testPerson.fields.category && typeof testPerson.fields.category === 'object' && 'fields' in testPerson.fields.category && (
                      <div><strong>Category:</strong> {String((testPerson.fields.category.fields as any)?.name || 'Unknown')}</div>
                    )}
                    {testPerson.fields.birthDate && (
                      <div><strong>Birth Date:</strong> {String(testPerson.fields.birthDate)}</div>
                    )}
                    {testPerson.fields.nationality && (
                      <div><strong>Nationality:</strong> {String(testPerson.fields.nationality)}</div>
                    )}
                    {testPerson.fields.occupation && Array.isArray(testPerson.fields.occupation) && (
                      <div><strong>Occupation:</strong> {testPerson.fields.occupation.map(String).join(', ')}</div>
                    )}
                    <div><strong>Featured:</strong> {testPerson.fields.featured ? 'Yes' : 'No'}</div>
                    <div><strong>Created:</strong> {new Date(testPerson.sys.createdAt).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>✅ Your Contentful integration is working!</p>
                  {categories.length === 0 && (
                    <p>🚀 Run <code>node setup-contentful.js</code> to create your categories</p>
                  )}
                  {people.length === 0 && (
                    <p>👥 Add some Person entries in your Contentful web interface</p>
                  )}
                  <p>🔧 Update your existing components to use the Contentful API functions</p>
                  <p>🎨 Customize the content types and fields as needed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentfulTest;