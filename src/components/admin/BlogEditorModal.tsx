'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost, slugify } from '@/lib/blogs';

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blogData: Partial<BlogPost>) => Promise<void>;
  editingBlog: BlogPost | null;
}

const CATEGORY_OPTIONS = [
  'Corporate Events',
  'Exhibitions & Expos',
  'BTL Activations',
  'Décor & Fabrications',
  'Event Planning Tips',
  'Weddings & Galas',
];

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
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [featured, setFeatured] = useState(false);

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title || '');
      setSlug(editingBlog.slug || '');
      setAutoSlug(false);
      setExcerpt(editingBlog.excerpt || '');
      setCategory(editingBlog.category || CATEGORY_OPTIONS[0]);
      setAuthor(editingBlog.author || 'Kraftive Editorial');
      setCoverImage(editingBlog.coverImage || '');
      setContent(editingBlog.content || '');
      setStatus(editingBlog.status || 'published');
      setFeatured(Boolean(editingBlog.featured));
    } else {
      setTitle('');
      setSlug('');
      setAutoSlug(true);
      setExcerpt('');
      setCategory(CATEGORY_OPTIONS[0]);
      setAuthor('Ashoutosh Sharma');
      setCoverImage('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80');
      setContent('');
      setStatus('published');
      setFeatured(false);
    }
    setError(null);
    setActiveTab('edit');
  }, [editingBlog, isOpen]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

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
      if (err instanceof Error) setError(err.message);
      else setError('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    setContent((prev) => `${prev}\n${prefix}Text Here${suffix}\n`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and Content are required.');
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
        content,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#1C1C1C] border border-[#C6A962]/30 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-[#FFFDF7]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#C6A962]/20 flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#C6A962]/10 border border-[#C6A962]/30 text-[#D4AF37]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-serif font-semibold text-[#FFFDF7]">
                {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <p className="text-xs text-[#C6A962]">
                {editingBlog ? `Editing ID: ${editingBlog.id}` : 'Fill in the details to publish a new article'}
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs & Close Button */}
          <div className="flex items-center gap-4">
            <div className="flex bg-[#262626] p-1 rounded-xl border border-[#C6A962]/20">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'edit'
                    ? 'bg-[#C6A962] text-[#121212] font-semibold'
                    : 'text-[#FAF6ED]/60 hover:text-[#FFFDF7]'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'preview'
                    ? 'bg-[#C6A962] text-[#121212] font-semibold'
                    : 'text-[#FAF6ED]/60 hover:text-[#FFFDF7]'
                }`}
              >
                Live Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-[#FAF6ED]/60 hover:text-[#FFFDF7] p-2 hover:bg-[#262626] rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 font-bold ml-2">×</button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'edit' ? (
            <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A962] mb-1.5 font-medium">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Masterclass in Corporate Event Planning"
                    className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-4 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs uppercase tracking-wider text-[#C6A962] font-medium">
                      URL Slug
                    </label>
                    <label className="text-[11px] text-[#FAF6ED]/60 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSlug}
                        onChange={(e) => setAutoSlug(e.target.checked)}
                        className="rounded border-[#C6A962]/40 bg-[#121212] text-[#C6A962]"
                      />
                      Auto-generate
                    </label>
                  </div>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setSlug(e.target.value);
                    }}
                    placeholder="post-url-slug"
                    className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-4 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Category, Author, Status, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A962] mb-1.5 font-medium">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#1C1C1C]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A962] mb-1.5 font-medium">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C6A962] mb-1.5 font-medium">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                    className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="published" className="bg-[#1C1C1C]">Published</option>
                    <option value="draft" className="bg-[#1C1C1C]">Save as Draft</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2.5 text-sm text-[#FFFDF7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded border-[#C6A962]/50 accent-[#D4AF37]"
                    />
                    <span>Featured Article</span>
                  </label>
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A962] mb-1.5 font-medium">
                  Cover Image (Upload File or Enter Image URL)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-4 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="w-full flex items-center justify-center gap-2 bg-[#262626] hover:bg-[#333] border border-[#C6A962]/30 rounded-xl py-2.5 px-3 text-xs text-[#D4AF37] font-medium cursor-pointer transition-colors">
                      {uploadingImage ? (
                        <span>Uploading...</span>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span>Upload Image</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                {coverImage && (
                  <div className="mt-2 relative w-full h-24 rounded-xl overflow-hidden border border-[#C6A962]/20 bg-[#121212]">
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A962] mb-1.5 font-medium">
                  Brief Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Short 1-2 sentence description shown in blog grid cards..."
                  className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl px-4 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Content Editor with Formatting Toolbar */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#C6A962] font-medium">
                    Article Body Content * (Markdown Supported)
                  </label>

                  {/* Markdown Quick Tools */}
                  <div className="flex items-center gap-1 bg-[#121212] p-1 rounded-lg border border-[#C6A962]/20 text-[11px] text-[#D4AF37]">
                    <button
                      type="button"
                      onClick={() => insertMarkdown('### ')}
                      className="px-2 py-0.5 hover:bg-[#262626] rounded font-bold"
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('**', '**')}
                      className="px-2 py-0.5 hover:bg-[#262626] rounded font-bold"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('*', '*')}
                      className="px-2 py-0.5 hover:bg-[#262626] rounded italic font-serif"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('- ')}
                      className="px-2 py-0.5 hover:bg-[#262626] rounded"
                      title="Bullet List"
                    >
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown('> ')}
                      className="px-2 py-0.5 hover:bg-[#262626] rounded"
                      title="Quote"
                    >
                      Quote
                    </button>
                  </div>
                </div>

                <textarea
                  required
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here..."
                  className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl p-4 text-sm text-[#FFFDF7] font-mono leading-relaxed focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </form>
          ) : (
            /* Live Preview View */
            <div className="bg-[#121212] p-6 rounded-2xl border border-[#C6A962]/20 space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#C6A962]/15 text-[#D4AF37] border border-[#C6A962]/30">
                  {category}
                </span>
                <h1 className="text-3xl font-serif text-[#FFFDF7] font-semibold">
                  {title || 'Untitled Post'}
                </h1>
                <div className="flex items-center gap-4 text-xs text-[#FAF6ED]/50 border-b border-[#C6A962]/15 pb-4">
                  <span>By {author}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {coverImage && (
                <div className="w-full h-64 rounded-xl overflow-hidden border border-[#C6A962]/20">
                  <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                </div>
              )}

              {excerpt && (
                <p className="text-base text-[#D4AF37] italic border-l-2 border-[#D4AF37] pl-4 py-1 font-serif">
                  {excerpt}
                </p>
              )}

              <div className="prose prose-invert max-w-none text-[#FFFDF7]/90 text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {content || <span className="text-[#FAF6ED]/30 italic">No content written yet...</span>}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#C6A962]/20 flex items-center justify-between bg-[#141414]">
          <span className="text-xs text-[#FAF6ED]/50">
            Status: <strong className="text-[#D4AF37] uppercase">{status}</strong>
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#FAF6ED]/70 hover:text-[#FFFDF7] hover:bg-[#262626] transition-colors"
            >
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
    </div>
  );
}
