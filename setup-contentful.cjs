#!/usr/bin/env node

const contentfulManagement = require('contentful-management');

// Configuration
const SPACE_ID = '9imvaxxd1mhv';
const MANAGEMENT_TOKEN = 'XVjsoBzaT_6uBd3QHd_jMIsla7EMNCfnPyVPvCfDuEk';
const ENVIRONMENT_ID = 'master';

// Initialize client
const client = contentfulManagement.createClient({
  accessToken: MANAGEMENT_TOKEN,
});

// Category data
const categories = [
  {
    name: 'Historical Figures',
    slug: 'historical-figures',
    description: 'Influential people who shaped history',
    icon: '🏛️',
    color: '#8B5CF6'
  },
  {
    name: 'Scientists & Innovators',
    slug: 'scientists-innovators',
    description: 'Brilliant minds who advanced human knowledge',
    icon: '🔬',
    color: '#06B6D4'
  },
  {
    name: 'Artists & Creatives',
    slug: 'artists-creatives',
    description: 'Visionaries who expressed beauty and meaning',
    icon: '🎨',
    color: '#F59E0B'
  },
  {
    name: 'Leaders & Politicians',
    slug: 'leaders-politicians',
    description: 'Those who guided nations and movements',
    icon: '⚖️',
    color: '#EF4444'
  },
  {
    name: 'Athletes & Sports',
    slug: 'athletes-sports',
    description: 'Champions who inspired through physical excellence',
    icon: '🏆',
    color: '#10B981'
  },
  {
    name: 'Writers & Thinkers',
    slug: 'writers-thinkers',
    description: 'Authors and philosophers who shaped thought',
    icon: '📚',
    color: '#8B5CF6'
  },
  {
    name: 'Entrepreneurs & Business',
    slug: 'entrepreneurs-business',
    description: 'Innovators who built industries and companies',
    icon: '💼',
    color: '#F97316'
  },
  {
    name: 'Entertainment & Media',
    slug: 'entertainment-media',
    description: 'Stars who captivated audiences worldwide',
    icon: '🎭',
    color: '#EC4899'
  }
];

// Utility functions
function logProgress(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Content type definitions
const categoryContentType = {
  name: 'Category',
  fields: [
    {
      id: 'name',
      name: 'Name',
      type: 'Symbol',
      required: true,
      validations: [
        { size: { min: 1, max: 100 } }
      ]
    },
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      required: true,
      validations: [
        { size: { min: 1, max: 100 } },
        { unique: true }
      ]
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      required: false,
      validations: [
        { size: { max: 500 } }
      ]
    },
    {
      id: 'icon',
      name: 'Icon',
      type: 'Symbol',
      required: false,
      validations: [
        { size: { max: 10 } }
      ]
    },
    {
      id: 'color',
      name: 'Color',
      type: 'Symbol',
      required: false,
      validations: [
        { size: { max: 7 } }
      ]
    },
    {
      id: 'count',
      name: 'Count',
      type: 'Integer',
      required: false,
      defaultValue: {
        'en-US': 0
      }
    }
  ],
  displayField: 'name'
};

const personContentType = {
  name: 'Person',
  fields: [
    {
      id: 'name',
      name: 'Name',
      type: 'Symbol',
      required: true,
      validations: [
        { size: { min: 1, max: 200 } }
      ]
    },
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      required: true,
      validations: [
        { size: { min: 1, max: 200 } },
        { unique: true }
      ]
    },
    {
      id: 'tagline',
      name: 'Tagline',
      type: 'Symbol',
      required: false,
      validations: [
        { size: { max: 300 } }
      ]
    },
    {
      id: 'biography',
      name: 'Biography',
      type: 'RichText',
      required: false
    },
    {
      id: 'profileImage',
      name: 'Profile Image',
      type: 'Link',
      linkType: 'Asset',
      required: false
    },
    {
      id: 'category',
      name: 'Category',
      type: 'Link',
      linkType: 'Entry',
      required: true,
      validations: [
        {
          linkContentType: ['category']
        }
      ]
    },
    {
      id: 'achievements',
      name: 'Achievements',
      type: 'Array',
      items: {
        type: 'Symbol',
        validations: [
          { size: { max: 500 } }
        ]
      },
      required: false
    },
    {
      id: 'timelineEvents',
      name: 'Timeline Events',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['timelineEvent']
          }
        ]
      },
      required: false
    },
    {
      id: 'featured',
      name: 'Featured',
      type: 'Boolean',
      required: false,
      defaultValue: {
        'en-US': false
      }
    },
    {
      id: 'viewCount',
      name: 'View Count',
      type: 'Integer',
      required: false,
      defaultValue: {
        'en-US': 0
      }
    },
    {
      id: 'birthDate',
      name: 'Birth Date',
      type: 'Date',
      required: false
    },
    {
      id: 'deathDate',
      name: 'Death Date',
      type: 'Date',
      required: false
    },
    {
      id: 'nationality',
      name: 'Nationality',
      type: 'Symbol',
      required: false,
      validations: [
        { size: { max: 100 } }
      ]
    },
    {
      id: 'occupation',
      name: 'Occupation',
      type: 'Array',
      items: {
        type: 'Symbol',
        validations: [
          { size: { max: 100 } }
        ]
      },
      required: false
    },
    {
      id: 'keywords',
      name: 'Keywords',
      type: 'Array',
      items: {
        type: 'Symbol',
        validations: [
          { size: { max: 50 } }
        ]
      },
      required: false
    },
    {
      id: 'socialLinks',
      name: 'Social Links',
      type: 'Array',
      items: {
        type: 'Object',
        validations: []
      },
      required: false
    },
    {
      id: 'gallery',
      name: 'Gallery',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Asset'
      },
      required: false
    }
  ],
  displayField: 'name'
};

const timelineEventContentType = {
  name: 'Timeline Event',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      validations: [
        { size: { min: 1, max: 200 } }
      ]
    },
    {
      id: 'date',
      name: 'Date',
      type: 'Date',
      required: true
    },
    {
      id: 'description',
      name: 'Description',
      type: 'RichText',
      required: false
    },
    {
      id: 'category',
      name: 'Category',
      type: 'Link',
      linkType: 'Entry',
      required: false,
      validations: [
        {
          linkContentType: ['category']
        }
      ]
    },
    {
      id: 'featured',
      name: 'Featured',
      type: 'Boolean',
      required: false,
      defaultValue: {
        'en-US': false
      }
    },
    {
      id: 'media',
      name: 'Media',
      type: 'Array',
      items: {
        type: 'Link',
        linkType: 'Asset'
      },
      required: false
    }
  ],
  displayField: 'title'
};

const mediaAssetContentType = {
  name: 'Media Asset',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      validations: [
        { size: { min: 1, max: 200 } }
      ]
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Text',
      required: false,
      validations: [
        { size: { max: 1000 } }
      ]
    },
    {
      id: 'file',
      name: 'File',
      type: 'Link',
      linkType: 'Asset',
      required: true
    },
    {
      id: 'altText',
      name: 'Alt Text',
      type: 'Symbol',
      required: false,
      validations: [
        { size: { max: 200 } }
      ]
    },
    {
      id: 'caption',
      name: 'Caption',
      type: 'Symbol',
      required: false,
      validations: [
        { size: { max: 300 } }
      ]
    }
  ],
  displayField: 'title'
};

// Main setup function
async function setupContentful() {
  try {
    logProgress('🚀 Starting Contentful setup...');
    
    // Get space and environment
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    
    logProgress(`Connected to space: ${space.name}`);
    
    // Create content types
    await createContentTypes(environment);
    
    // Create category entries
    await createCategoryEntries(environment);
    
    logProgress('🎉 Contentful setup completed successfully!');
    
  } catch (error) {
    logProgress(`Setup failed: ${error.message}`, 'error');
    console.error(error);
    process.exit(1);
  }
}

async function createContentTypes(environment) {
  logProgress('📋 Creating content types...');
  
  const contentTypes = [
    { id: 'category', definition: categoryContentType },
    { id: 'timelineEvent', definition: timelineEventContentType },
    { id: 'mediaAsset', definition: mediaAssetContentType },
    { id: 'person', definition: personContentType }
  ];
  
  for (const { id, definition } of contentTypes) {
    try {
      // Check if content type already exists
      let contentType;
      try {
        contentType = await environment.getContentType(id);
        logProgress(`Content type '${definition.name}' already exists, updating...`);
        
        // Update existing content type
        Object.assign(contentType, definition);
        contentType = await contentType.update();
        
      } catch (error) {
        if (error.name === 'NotFound') {
          logProgress(`Creating content type: ${definition.name}`);
          contentType = await environment.createContentTypeWithId(id, definition);
        } else {
          throw error;
        }
      }
      
      // Publish content type
      await contentType.publish();
      logProgress(`✅ Content type '${definition.name}' ready`, 'success');
      
      // Small delay to avoid rate limiting
      await delay(500);
      
    } catch (error) {
      logProgress(`Failed to create content type '${definition.name}': ${error.message}`, 'error');
      throw error;
    }
  }
}

async function createCategoryEntries(environment) {
  logProgress('📁 Creating category entries...');
  
  const createdCategories = [];
  
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    
    try {
      logProgress(`Creating category ${i + 1}/${categories.length}: ${category.name}`);
      
      // Check if entry already exists
      const existingEntries = await environment.getEntries({
        content_type: 'category',
        'fields.slug': category.slug,
        limit: 1
      });
      
      let entry;
      if (existingEntries.items.length > 0) {
        logProgress(`Category '${category.name}' already exists, updating...`);
        entry = existingEntries.items[0];
        
        // Update fields
        entry.fields = {
          name: { 'en-US': category.name },
          slug: { 'en-US': category.slug },
          description: { 'en-US': category.description },
          icon: { 'en-US': category.icon },
          color: { 'en-US': category.color },
          count: { 'en-US': 0 }
        };
        
        entry = await entry.update();
      } else {
        // Create new entry
        entry = await environment.createEntry('category', {
          fields: {
            name: { 'en-US': category.name },
            slug: { 'en-US': category.slug },
            description: { 'en-US': category.description },
            icon: { 'en-US': category.icon },
            color: { 'en-US': category.color },
            count: { 'en-US': 0 }
          }
        });
      }
      
      // Publish entry
      await entry.publish();
      
      createdCategories.push({
        ...category,
        id: entry.sys.id
      });
      
      logProgress(`✅ Category '${category.name}' created/updated`, 'success');
      
      // Small delay to avoid rate limiting
      await delay(300);
      
    } catch (error) {
      logProgress(`Failed to create category '${category.name}': ${error.message}`, 'error');
      throw error;
    }
  }
  
  logProgress(`🎯 Successfully created/updated ${createdCategories.length} categories`, 'success');
  
  // Display summary
  console.log('\n📊 SUMMARY:');
  console.log('===========');
  createdCategories.forEach((cat, index) => {
    console.log(`${index + 1}. ${cat.name} (${cat.slug}) - ID: ${cat.id}`);
  });
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  logProgress(`Unhandled Rejection at: ${promise}, reason: ${reason}`, 'error');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logProgress(`Uncaught Exception: ${error.message}`, 'error');
  process.exit(1);
});

// Run the setup
if (require.main === module) {
  setupContentful();
}

module.exports = {
  setupContentful,
  categories
};