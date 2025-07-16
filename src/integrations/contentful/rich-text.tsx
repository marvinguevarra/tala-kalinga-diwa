import React from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { Document } from '@contentful/rich-text-types';
import { getImageUrl, getImageAlt } from './utils';

// Default rich text rendering options
export const defaultRichTextOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em className="italic">{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u className="underline">{text}</u>,
    [MARKS.CODE]: (text) => (
      <code className="px-1 py-0.5 bg-muted text-muted-foreground rounded text-sm font-mono">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-2xl font-semibold mb-4 mt-6 first:mt-0">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-xl font-semibold mb-3 mt-4 first:mt-0">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <h4 className="text-lg font-semibold mb-2 mt-3 first:mt-0">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className="text-base font-semibold mb-2 mt-2 first:mt-0">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className="text-sm font-semibold mb-2 mt-2 first:mt-0">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li className="ml-4">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 italic bg-muted/30 rounded-r">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => (
      <hr className="my-8 border-border" />
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = node.data?.target;
      if (!asset) return null;

      const imageUrl = getImageUrl(asset, { width: 800, format: 'webp', quality: 85 });
      const altText = getImageAlt(asset);

      return (
        <div className="my-6">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full rounded-lg shadow-sm"
            loading="lazy"
          />
          {asset.fields?.description && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              {asset.fields.description}
            </p>
          )}
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const href = node.data?.uri;
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      // Handle links to other entries
      const entry = node.data?.target;
      if (!entry) return <span>{children}</span>;

      // You can customize this based on your routing setup
      const href = `/${entry.fields?.slug || entry.sys?.id}`;
      return (
        <a
          href={href}
          className="text-primary underline hover:text-primary/80 transition-colors"
        >
          {children}
        </a>
      );
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      // Handle embedded entries (like call-to-action blocks)
      const entry = node.data?.target;
      if (!entry) return null;

      // Customize based on your content types
      return (
        <div className="my-4 p-4 border border-border rounded-lg bg-muted/30">
          <strong>{entry.fields?.title || 'Embedded Content'}</strong>
          {entry.fields?.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {entry.fields.description}
            </p>
          )}
        </div>
      );
    },
  },
};

// Compact rich text options (for cards, previews, etc.)
export const compactRichTextOptions: Options = {
  ...defaultRichTextOptions,
  renderNode: {
    ...defaultRichTextOptions.renderNode,
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-2 last:mb-0 leading-normal">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-lg font-semibold mb-2">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-base font-semibold mb-2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-sm font-semibold mb-1">{children}</h3>
    ),
    // Disable large elements in compact mode
    [BLOCKS.EMBEDDED_ASSET]: () => null,
    [BLOCKS.QUOTE]: (node, children) => (
      <p className="italic text-muted-foreground">{children}</p>
    ),
  },
};

// Main component for rendering rich text
interface RichTextProps {
  document: Document | undefined;
  options?: Options;
  className?: string;
}

export function RichText({ document, options = defaultRichTextOptions, className }: RichTextProps) {
  if (!document) return null;

  return (
    <div className={className}>
      {documentToReactComponents(document, options)}
    </div>
  );
}

// Specialized components
export function RichTextPreview({ document, maxLength = 200 }: { document: Document | undefined; maxLength?: number }) {
  if (!document) return null;

  // Extract plain text for preview
  function extractText(node: any): string {
    if (node.nodeType === 'text') {
      return node.value || '';
    }
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractText).join('');
    }
    return '';
  }

  const plainText = document.content?.map(extractText).join(' ').trim() || '';
  const truncatedText = plainText.length > maxLength 
    ? plainText.substring(0, maxLength).trim() + '...'
    : plainText;

  return (
    <p className="text-muted-foreground leading-relaxed">
      {truncatedText}
    </p>
  );
}

export function CompactRichText({ document, className }: RichTextProps) {
  return (
    <RichText 
      document={document} 
      options={compactRichTextOptions} 
      className={className}
    />
  );
}