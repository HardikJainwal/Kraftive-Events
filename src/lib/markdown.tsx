import React from 'react';

/**
 * Parses inline markdown tokens: **bold**, *italic*, [text](url), `code`
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return '';

  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.*?)\*\*|__(.*?)__|\[(.*?)\]\((.*?)\)|`([^`]+)`|\*(.*?)\*|_(.*?)_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const [, , bold1, bold2, linkText, linkUrl, codeText, ital1, ital2] = match;

    if (bold1 !== undefined || bold2 !== undefined) {
      parts.push(
        <strong key={key++} className="font-bold text-inherit">
          {bold1 ?? bold2}
        </strong>
      );
    } else if (linkText !== undefined && linkUrl !== undefined) {
      parts.push(
        <a
          key={key++}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-dark dark:text-gold underline hover:opacity-80 transition-opacity"
        >
          {linkText}
        </a>
      );
    } else if (codeText !== undefined) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 bg-gold/10 rounded text-xs font-mono">
          {codeText}
        </code>
      );
    } else if (ital1 !== undefined || ital2 !== undefined) {
      parts.push(
        <em key={key++} className="italic text-inherit">
          {ital1 ?? ital2}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Full block markdown parser for article content
 */
export function renderFormattedContent(content: string): React.ReactNode[] {
  if (!content) return [];

  // Normalize line endings and split into paragraph blocks
  const blocks = content.split(/\n\s*\n/);

  return blocks
    .map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H1
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="font-display text-3xl md:text-4xl font-bold my-6">
            {renderInlineMarkdown(trimmed.replace(/^#\s+/, ''))}
          </h1>
        );
      }

      // H2
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="font-display text-2xl md:text-3xl font-bold mt-8 mb-4 border-b border-gold/20 pb-2"
          >
            {renderInlineMarkdown(trimmed.replace(/^##\s+/, ''))}
          </h2>
        );
      }

      // H3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-display text-xl md:text-2xl font-bold mt-6 mb-3">
            {renderInlineMarkdown(trimmed.replace(/^###\s+/, ''))}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="my-6 p-5 md:p-6 rounded-2xl bg-gold/5 border-l-4 border-gold italic font-serif text-base md:text-lg leading-relaxed shadow-sm"
          >
            {renderInlineMarkdown(trimmed.replace(/^>\s+/, ''))}
          </blockquote>
        );
      }

      const lines = trimmed.split('\n');

      // Unordered List (- or * or •)
      const isUnorderedList = lines.every((line) => /^\s*[-*•]\s+/.test(line));
      if (isUnorderedList) {
        return (
          <ul
            key={idx}
            className="my-4 space-y-2 list-disc list-inside text-base md:text-lg leading-relaxed pl-2"
          >
            {lines.map((line, i) => (
              <li key={i}>{renderInlineMarkdown(line.replace(/^\s*[-*•]\s+/, ''))}</li>
            ))}
          </ul>
        );
      }

      // Ordered List (1., 2., etc)
      const isOrderedList = lines.every((line) => /^\s*\d+\.\s+/.test(line));
      if (isOrderedList) {
        return (
          <ol
            key={idx}
            className="my-4 space-y-2 list-decimal list-inside text-base md:text-lg leading-relaxed pl-2"
          >
            {lines.map((line, i) => (
              <li key={i}>{renderInlineMarkdown(line.replace(/^\s*\d+\.\s+/, ''))}</li>
            ))}
          </ol>
        );
      }

      // Regular Paragraph with multiline support
      return (
        <p key={idx} className="text-base md:text-lg leading-relaxed mb-6">
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {lIdx > 0 && <br />}
              {renderInlineMarkdown(line)}
            </React.Fragment>
          ))}
        </p>
      );
    })
    .filter(Boolean);
}
