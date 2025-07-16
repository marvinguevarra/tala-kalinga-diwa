# Contentful Setup Guide

This script sets up your Contentful space with the required content types and initial category data.

## Prerequisites

1. **Node.js** (version 16 or higher)
2. **Contentful Management API Token** with full access to your space
3. **Space ID** from your Contentful space

## What the Script Does

### 🏗️ Creates Content Types:
1. **Category** - For organizing profiles
2. **Timeline Event** - For life events and milestones  
3. **Media Asset** - For managing images and files
4. **Person** - For biographical profiles

### 📁 Creates 8 Initial Categories:
1. 🏛️ Historical Figures
2. 🔬 Scientists & Innovators
3. 🎨 Artists & Creatives
4. ⚖️ Leaders & Politicians
5. 🏆 Athletes & Sports
6. 📚 Writers & Thinkers
7. 💼 Entrepreneurs & Business
8. 🎭 Entertainment & Media

## Running the Script

### Option 1: Using Node.js directly
```bash
# Install dependencies (if not already done)
npm install

# Run the setup script
node setup-contentful.js
```

### Option 2: Using npx (recommended)
```bash
# Run directly without installing globally
npx node setup-contentful.js
```

## Script Output

The script provides detailed progress logging:

```
ℹ️ [2024-01-15T10:30:00.000Z] 🚀 Starting Contentful setup...
ℹ️ [2024-01-15T10:30:01.000Z] Connected to space: Your Space Name
ℹ️ [2024-01-15T10:30:02.000Z] 📋 Creating content types...
ℹ️ [2024-01-15T10:30:03.000Z] Creating content type: Category
✅ [2024-01-15T10:30:04.000Z] Content type 'Category' ready
...
ℹ️ [2024-01-15T10:30:15.000Z] 📁 Creating category entries...
ℹ️ [2024-01-15T10:30:16.000Z] Creating category 1/8: Historical Figures
✅ [2024-01-15T10:30:17.000Z] Category 'Historical Figures' created/updated
...
✅ [2024-01-15T10:30:25.000Z] 🎉 Contentful setup completed successfully!

📊 SUMMARY:
===========
1. Historical Figures (historical-figures) - ID: 1a2b3c4d5e
2. Scientists & Innovators (scientists-innovators) - ID: 2b3c4d5e6f
...
```

## Error Handling

The script includes comprehensive error handling:

- ✅ **Rate Limiting**: Built-in delays to respect Contentful API limits
- ✅ **Duplicate Detection**: Safely updates existing content types and entries
- ✅ **Validation**: Ensures all required fields are properly configured
- ✅ **Rollback Safety**: Won't break existing content

## Troubleshooting

### Common Issues:

1. **Authentication Error**
   ```
   Error: The access token you sent could not be found or is invalid
   ```
   - Verify your Management Token is correct
   - Ensure the token has admin/full access permissions

2. **Space Not Found**
   ```
   Error: The resource could not be found
   ```
   - Double-check your Space ID
   - Ensure you have access to the specified space

3. **Rate Limiting**
   ```
   Error: You have exceeded the rate limit
   ```
   - The script includes delays, but if you encounter this, wait a few minutes and retry

### Getting Help:

1. Check the [Contentful Management API docs](https://www.contentful.com/developers/docs/references/content-management-api/)
2. Verify your credentials in the [Contentful web app](https://app.contentful.com/)
3. Review the script logs for specific error messages

## Next Steps

After running this script successfully:

1. ✅ Your content types will be ready
2. ✅ Your categories will be populated
3. 🚀 You can start adding Person entries through the Contentful web interface
4. 🚀 Your React app will be able to fetch this content

## Configuration Notes

The script is currently configured for:
- **Environment**: `master` (default)
- **Space ID**: `9imvaxxd1mhv`
- **Locale**: `en-US`

To modify these settings, edit the constants at the top of `setup-contentful.js`.