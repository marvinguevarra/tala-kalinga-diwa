import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get Contentful configuration from secrets
    const spaceId = Deno.env.get('CONTENTFUL_SPACE_ID')
    const accessToken = Deno.env.get('CONTENTFUL_ACCESS_TOKEN')
    const previewAccessToken = Deno.env.get('CONTENTFUL_PREVIEW_ACCESS_TOKEN')
    const environment = Deno.env.get('CONTENTFUL_ENVIRONMENT') || 'master'

    console.log('Fetching Contentful config:', {
      hasSpaceId: !!spaceId,
      hasAccessToken: !!accessToken,
      hasPreviewAccessToken: !!previewAccessToken,
      environment,
      spaceIdValue: spaceId ? spaceId.substring(0, 8) + '...' : 'missing',
      tokenLength: accessToken ? accessToken.length : 0
    })

    if (!spaceId || !accessToken) {
      return new Response(
        JSON.stringify({ 
          error: 'Contentful credentials not configured. Please add CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to your Supabase secrets.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const config = {
      spaceId,
      accessToken,
      previewAccessToken,
      environment
    }

    return new Response(
      JSON.stringify(config),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error fetching Contentful config:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch Contentful configuration' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})