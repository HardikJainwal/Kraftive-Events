'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BlogPost, slugify } from '@/lib/blogs';

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blogData: Partial<BlogPost>) => Promise<void>;
  editingBlog: BlogPost | null;
}

const CATEGORY_OPTIONS = [
  'Corporate Events',
  'Venue Sourcing & Management',
  'BTL Activations',
  'Exhibitions & Stall Fabrication',
  'Décor & Fabrications',
  'Customised Gifting',
  'Engagement Activities',
  'Branding & Outdoor Media',
  'Weddings & Galas',
  'AI Films & Creative Tech',
  'Event Planning Tips',
];

/* ═══════════════════════════════════════════════════════
   HTML ↔ Markdown Converters
   (so we store markdown but edit visually)
   ═══════════════════════════════════════════════════════ */

function inlineMarkdownToHtml(text: string): string {
  let r = text;
  // Bold
  r = r.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  r = r.replace(/__(.*?)__/g, '<strong>$1</strong>');
  // Italic (must come after bold)
  r = r.replace(/\*(.*?)\*/g, '<em>$1</em>');
  r = r.replace(/_(.*?)_/g, '<em>$1</em>');
  // Links
  r = r.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Inline code
  r = r.replace(/`([^`]+)`/g, '<code>$1</code>');
  return r;
}

function markdownToHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) return '';

  const blocks = markdown.split(/\n\s*\n/);
  let html = '';

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      html += '<hr>';
      continue;
    }

    if (trimmed.startsWith('### ')) {
      html += `<h3>${inlineMarkdownToHtml(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith('## ')) {
      html += `<h2>${inlineMarkdownToHtml(trimmed.slice(3))}</h2>`;
    } else if (trimmed.startsWith('# ')) {
      html += `<h1>${inlineMarkdownToHtml(trimmed.slice(2))}</h1>`;
    } else if (trimmed.startsWith('> ')) {
      const quoteContent = trimmed.split('\n').map(l => l.replace(/^>\s?/, '')).join('<br>');
      html += `<blockquote>${inlineMarkdownToHtml(quoteContent)}</blockquote>`;
    } else {
      const lines = trimmed.split('\n');
      const isUL = lines.every((l) => /^\s*[-*•]\s+/.test(l));
      const isOL = lines.every((l) => /^\s*\d+\.\s+/.test(l));

      if (isUL) {
        html += '<ul>' + lines.map((l) => `<li>${inlineMarkdownToHtml(l.replace(/^\s*[-*•]\s+/, ''))}</li>`).join('') + '</ul>';
      } else if (isOL) {
        html += '<ol>' + lines.map((l) => `<li>${inlineMarkdownToHtml(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('') + '</ol>';
      } else {
        html += `<p>${inlineMarkdownToHtml(lines.join('<br>'))}</p>`;
      }
    }
  }

  return html || '';
}

function walkNode(node: Node): string {
  let result = '';

  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      result += child.textContent || '';
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const inner = walkNode(el);

      switch (tag) {
        case 'h1':
          result += `\n\n# ${inner}\n\n`;
          break;
        case 'h2':
          result += `\n\n## ${inner}\n\n`;
          break;
        case 'h3':
          result += `\n\n### ${inner}\n\n`;
          break;
        case 'strong':
        case 'b':
          result += `**${inner}**`;
          break;
        case 'em':
        case 'i':
          result += `*${inner}*`;
          break;
        case 'a': {
          const href = el.getAttribute('href') || '';
          result += `[${inner}](${href})`;
          break;
        }
        case 'code':
          result += `\`${inner}\``;
          break;
        case 'br':
          result += '\n';
          break;
        case 'p':
          result += `\n\n${inner}\n\n`;
          break;
        case 'div':
          // contentEditable often wraps lines in divs
          result += `\n\n${inner}\n\n`;
          break;
        case 'blockquote': {
          const lines = inner.trim().split('\n');
          result += '\n\n' + lines.map((l) => `> ${l}`).join('\n') + '\n\n';
          break;
        }
        case 'ul':
          result += '\n\n' + inner + '\n\n';
          break;
        case 'ol':
          result += '\n\n' + inner + '\n\n';
          break;
        case 'li': {
          const parentTag = el.parentElement?.tagName.toLowerCase();
          if (parentTag === 'ol') {
            // Count the li index
            const siblings = Array.from(el.parentElement!.children);
            const idx = siblings.indexOf(el) + 1;
            result += `${idx}. ${inner}\n`;
          } else {
            result += `- ${inner}\n`;
          }
          break;
        }
        case 'hr':
          result += '\n\n---\n\n';
          break;
        default:
          result += inner;
          break;
      }
    }
  }

  return result;
}

function htmlToMarkdown(html: string): string {
  if (!html || !html.trim()) return '';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  let md = walkNode(tempDiv);

  // Clean up excessive newlines
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  return md;
}

/* ═══════════════════════════════════════════════════════
   WYSIWYG Blog Editor Component
   ═══════════════════════════════════════════════════════ */

export default function BlogEditorModal({
  isOpen,
  onClose,
  onSave,
  editingBlog,
}: BlogEditorModalProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [author, setAuthor] = useState('Kraftive Editorial');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [featured, setFeatured] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(true);

  // Active formatting state for toolbar highlights
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const editorRef = useRef<HTMLDivElement>(null);

  // ——— Initialize / Reset ———
  useEffect(() => {
    if (!isOpen) return;

    if (editingBlog) {
      setTitle(editingBlog.title || '');
      setSlug(editingBlog.slug || '');
      setAutoSlug(false);
      setExcerpt(editingBlog.excerpt || '');
      setCategory(editingBlog.category || CATEGORY_OPTIONS[0]);
      setAuthor(editingBlog.author || 'Kraftive Editorial');
      setCoverImage(editingBlog.coverImage || '');
      setStatus(editingBlog.status || 'published');
      setFeatured(Boolean(editingBlog.featured));

      // Load markdown content into WYSIWYG editor as HTML
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = markdownToHtml(editingBlog.content || '');
        }
      });
    } else {
      setTitle('');
      setSlug('');
      setAutoSlug(true);
      setExcerpt('');
      setCategory(CATEGORY_OPTIONS[0]);
      setAuthor('Ashoutosh Sharma');
      setCoverImage('');
      setStatus('published');
      setFeatured(false);

      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = '';
        }
      });
    }
    setError(null);
    setShowSettings(true);
    setActiveFormats(new Set());
  }, [editingBlog, isOpen]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) setSlug(slugify(val));
  };

  // ——— Formatting Commands ———
  const execFormat = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateToolbarState();
  }, []);

  const updateToolbarState = useCallback(() => {
    const formats = new Set<string>();
    try {
      if (document.queryCommandState('bold')) formats.add('bold');
      if (document.queryCommandState('italic')) formats.add('italic');
      if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
      if (document.queryCommandState('insertOrderedList')) formats.add('ol');

      const block = document.queryCommandValue('formatBlock');
      if (block) formats.add(block.toLowerCase());
    } catch {
      // Ignore errors from queryCommandState
    }
    setActiveFormats(formats);
  }, []);

  const handleInsertLink = useCallback(() => {
    const url = prompt('Enter the URL:');
    if (url) {
      document.execCommand('createLink', false, url);
      editorRef.current?.focus();
    }
  }, []);

  const handleInsertHR = useCallback(() => {
    document.execCommand('insertHorizontalRule', false);
    editorRef.current?.focus();
  }, []);

  // Strip formatting on paste to avoid Word/web garbage
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // ——— Cover Image Upload ———
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image');
      setCoverImage(data.url);
    } catch (err: unknown) {
      console.warn('[Upload Fallback] Using base64:', err);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  // ——— Submit: Convert HTML back to Markdown ———
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const editorContent = editorRef.current?.innerHTML || '';
    const markdownContent = htmlToMarkdown(editorContent);

    if (!title.trim() || !markdownContent.trim()) {
      setError('Title and article content are required.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSave({
        title,
        slug: slug ? slugify(slug) : slugify(title),
        excerpt,
        category,
        author,
        coverImage,
        content: markdownContent,
        status,
        featured,
      });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Failed to save blog post.');
    } finally {
      setSaving(false);
    }
  };

  // ——— Word count from editor ———
  const getWordCount = () => {
    const text = editorRef.current?.innerText || '';
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  if (!isOpen) return null;

  // ——— Toolbar Button Component ———
  const ToolBtn = ({
    onClick,
    label,
    title,
    active = false,
    icon,
    className = '',
  }: {
    onClick: () => void;
    label?: string;
    title: string;
    active?: boolean;
    icon?: React.ReactNode;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`
        flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all
        ${active
          ? 'bg-[#D4AF37] text-[#121212] shadow-sm'
          : 'text-[#FAF6ED]/70 hover:text-[#FFFDF7] hover:bg-[#2A2A2A]'
        }
        ${className}
      `}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
      <div className="bg-[#1C1C1C] border border-[#C6A962]/30 rounded-2xl w-full max-w-[95vw] h-[95vh] flex flex-col shadow-2xl overflow-hidden text-[#FFFDF7]">

        {/* ═══════════════ HEADER ═══════════════ */}
        <div className="px-5 py-3 border-b border-[#C6A962]/20 flex items-center justify-between bg-[#141414] flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#C6A962]/10 border border-[#C6A962]/30 text-[#D4AF37]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            <div>
              <h2 className="text-base font-serif font-semibold">
                {editingBlog ? 'Edit Article' : 'Write New Article'}
              </h2>
              <p className="text-[10px] text-[#C6A962]">
                Type your article below. Select text and use the toolbar to format it.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Settings Panel */}
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              title={showSettings ? 'Hide settings' : 'Show settings'}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider border transition-all ${
                showSettings
                  ? 'bg-[#C6A962]/15 border-[#C6A962]/40 text-[#D4AF37]'
                  : 'border-[#C6A962]/20 text-[#FAF6ED]/50 hover:text-[#D4AF37]'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="text-[#FAF6ED]/60 hover:text-[#FFFDF7] p-2 hover:bg-[#262626] rounded-xl transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-5 mt-3 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-sm flex items-center justify-between flex-shrink-0">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 font-bold ml-2">×</button>
          </div>
        )}

        {/* ═══════════════ BODY ═══════════════ */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <form id="blog-form" onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">

            {/* ——— Collapsible Settings Panel ——— */}
            {showSettings && (
              <div className="px-5 py-4 border-b border-[#C6A962]/15 bg-[#181818] flex-shrink-0 space-y-4 overflow-y-auto max-h-[35vh]">
                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] mb-1 font-semibold">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. How to Plan a Corporate Summit"
                      className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-4 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] font-semibold">
                        URL Slug
                      </label>
                      <label className="text-[10px] text-[#FAF6ED]/60 flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoSlug}
                          onChange={(e) => setAutoSlug(e.target.checked)}
                          className="rounded border-[#C6A962]/40 bg-[#121212] text-[#C6A962]"
                        />
                        Auto
                      </label>
                    </div>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => { setAutoSlug(false); setSlug(e.target.value); }}
                      placeholder="auto-generated-from-title"
                      className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-4 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                {/* Category, Author, Status, Featured */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] mb-1 font-semibold">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]">
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat} className="bg-[#1C1C1C]">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] mb-1 font-semibold">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] mb-1 font-semibold">Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as 'published' | 'draft')} className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]">
                      <option value="published" className="bg-[#1C1C1C]">Publish Now</option>
                      <option value="draft" className="bg-[#1C1C1C]">Save as Draft</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 text-xs text-[#FFFDF7] cursor-pointer">
                      <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded border-[#C6A962]/50 accent-[#D4AF37]" />
                      Featured Article
                    </label>
                  </div>
                </div>

                {/* Cover Image + Excerpt */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] mb-1 font-semibold">Cover Image</label>
                    <div className="flex gap-2 items-center">
                      <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Paste image URL here..." className="flex-1 bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]" />
                      <label className="flex items-center gap-1.5 bg-[#262626] hover:bg-[#333] border border-[#C6A962]/30 rounded-xl py-2 px-3 text-[10px] text-[#D4AF37] font-semibold cursor-pointer transition-colors flex-shrink-0">
                        {uploadingImage ? <span>Uploading...</span> : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            <span>Upload</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} className="hidden" />
                      </label>
                    </div>
                    {coverImage && (
                      <div className="mt-1.5 relative w-full h-16 rounded-lg overflow-hidden border border-[#C6A962]/20 bg-[#121212]">
                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C6A962] mb-1 font-semibold">Summary / Excerpt</label>
                    <textarea rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary shown on the blog listing page..." className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37] resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* ——— FORMATTING TOOLBAR ——— */}
            <div className="px-4 py-2 border-b border-[#C6A962]/15 bg-[#161616] flex items-center gap-1 flex-wrap flex-shrink-0">
              {/* Heading buttons */}
              <ToolBtn
                onClick={() => execFormat('formatBlock', 'h2')}
                label="Heading"
                title="Make selected text a heading"
                active={activeFormats.has('h2')}
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v16h2v-7h6v7h2V4h-2v7H7V4H5z"/></svg>
                }
              />
              <ToolBtn
                onClick={() => execFormat('formatBlock', 'h3')}
                label="Sub-heading"
                title="Make selected text a sub-heading"
                active={activeFormats.has('h3')}
                icon={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v16h2v-7h6v7h2V4h-2v7H7V4H5z"/></svg>
                }
              />
              <ToolBtn
                onClick={() => execFormat('formatBlock', 'p')}
                label="Normal"
                title="Normal paragraph text"
                active={activeFormats.has('p') || (!activeFormats.has('h2') && !activeFormats.has('h3') && !activeFormats.has('blockquote'))}
                icon={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
                }
              />

              <div className="w-px h-6 bg-[#C6A962]/20 mx-1" />

              {/* Inline formatting */}
              <ToolBtn
                onClick={() => execFormat('bold')}
                label="Bold"
                title="Bold text (Ctrl+B)"
                active={activeFormats.has('bold')}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>
                }
              />
              <ToolBtn
                onClick={() => execFormat('italic')}
                label="Italic"
                title="Italic text (Ctrl+I)"
                active={activeFormats.has('italic')}
                icon={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
                }
              />

              <div className="w-px h-6 bg-[#C6A962]/20 mx-1" />

              {/* Lists */}
              <ToolBtn
                onClick={() => execFormat('insertUnorderedList')}
                label="• Bullets"
                title="Bullet point list"
                active={activeFormats.has('ul')}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
                }
              />
              <ToolBtn
                onClick={() => execFormat('insertOrderedList')}
                label="1. Numbers"
                title="Numbered list"
                active={activeFormats.has('ol')}
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                }
              />

              <div className="w-px h-6 bg-[#C6A962]/20 mx-1" />

              {/* Quote */}
              <ToolBtn
                onClick={() => execFormat('formatBlock', 'blockquote')}
                label="Quote"
                title="Blockquote"
                active={activeFormats.has('blockquote')}
                icon={
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
                }
              />

              {/* Link */}
              <ToolBtn
                onClick={handleInsertLink}
                label="Link"
                title="Insert a link"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                }
              />

              {/* Horizontal Rule */}
              <ToolBtn
                onClick={handleInsertHR}
                label="Line"
                title="Insert horizontal line separator"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                }
              />

              <div className="w-px h-6 bg-[#C6A962]/20 mx-1" />

              {/* Undo / Redo */}
              <ToolBtn
                onClick={() => document.execCommand('undo')}
                title="Undo"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10h10a5 5 0 015 5v2"/><path d="M3 10l4-4M3 10l4 4"/></svg>
                }
              />
              <ToolBtn
                onClick={() => document.execCommand('redo')}
                title="Redo"
                icon={
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10H11a5 5 0 00-5 5v2"/><path d="M21 10l-4-4M21 10l-4 4"/></svg>
                }
              />

              {/* Help tip on the right */}
              <div className="ml-auto flex items-center gap-2 text-[10px] text-[#FAF6ED]/35">
                <span className="hidden md:inline">💡 Select text → click a button to format it</span>
              </div>
            </div>

            {/* ——— WYSIWYG EDITOR AREA ——— */}
            <div className="flex-1 overflow-y-auto bg-[#121212]">
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onKeyUp={updateToolbarState}
                onMouseUp={updateToolbarState}
                onPaste={handlePaste}
                data-placeholder="Start typing your article here...

Click 'Heading' to create a section title.
Select text and click 'Bold' to make it bold.
Click '• Bullets' to start a bullet list."
                className="wysiwyg-editor min-h-full max-w-4xl mx-auto px-8 py-6 text-[#FFFDF7]/90 text-base leading-[1.9] focus:outline-none"
                style={{ caretColor: '#D4AF37' }}
              />
            </div>
          </form>
        </div>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <div className="px-5 py-3 border-t border-[#C6A962]/20 flex items-center justify-between bg-[#141414] flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-[#FAF6ED]/50">
              Status: <strong className="text-[#D4AF37] uppercase">{status}</strong>
            </span>
            <span className="text-[10px] text-[#FAF6ED]/35 hidden sm:inline">
              {getWordCount()} words · ~{Math.max(1, Math.ceil(getWordCount() / 200))} min read
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-medium text-[#FAF6ED]/70 hover:text-[#FFFDF7] hover:bg-[#262626] transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              form="blog-form"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C6A962] to-[#A8893A] text-[#121212] font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#121212]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editingBlog ? 'Update Article' : 'Publish Article'}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ——— Embedded Styles for the WYSIWYG editor ——— */}
      <style>{`
        .wysiwyg-editor:empty::before {
          content: attr(data-placeholder);
          color: rgba(250, 246, 237, 0.2);
          font-style: italic;
          white-space: pre-line;
          pointer-events: none;
          display: block;
        }

        .wysiwyg-editor h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.2em 0 0.5em;
          color: #FFFDF7;
          font-family: serif;
          line-height: 1.3;
        }
        .wysiwyg-editor h2 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 1.2em 0 0.4em;
          color: #FFFDF7;
          font-family: serif;
          border-bottom: 1px solid rgba(198, 169, 98, 0.2);
          padding-bottom: 0.3em;
          line-height: 1.3;
        }
        .wysiwyg-editor h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 1em 0 0.3em;
          color: #FFFDF7;
          font-family: serif;
          line-height: 1.4;
        }
        .wysiwyg-editor p {
          margin: 0.6em 0;
        }
        .wysiwyg-editor strong, .wysiwyg-editor b {
          font-weight: 700;
          color: #FFFDF7;
        }
        .wysiwyg-editor em, .wysiwyg-editor i {
          font-style: italic;
          color: #D4AF37;
        }
        .wysiwyg-editor ul {
          list-style: disc;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .wysiwyg-editor ol {
          list-style: decimal;
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .wysiwyg-editor li {
          margin: 0.25em 0;
        }
        .wysiwyg-editor blockquote {
          border-left: 3px solid #D4AF37;
          padding: 0.5em 1em;
          margin: 0.8em 0;
          background: rgba(198, 169, 98, 0.05);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #D4AF37;
        }
        .wysiwyg-editor a {
          color: #D4AF37;
          text-decoration: underline;
          cursor: pointer;
        }
        .wysiwyg-editor hr {
          border: none;
          border-top: 1px solid rgba(198, 169, 98, 0.25);
          margin: 1.5em 0;
        }
        .wysiwyg-editor code {
          background: rgba(198, 169, 98, 0.1);
          padding: 0.1em 0.4em;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}
