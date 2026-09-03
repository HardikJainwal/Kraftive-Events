'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '@/lib/blogs';
import BlogEditorModal from './BlogEditorModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/blogs');
      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          return;
        }
        throw new Error('Failed to load blog posts');
      }

      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCreateNew = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete blog post');
      }

      await fetchBlogs();
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert('Deletion failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveBlog = async (blogData: Partial<BlogPost>) => {
    const isEdit = Boolean(editingBlog);
    const url = isEdit ? `/api/admin/blogs/${editingBlog?.id}` : '/api/admin/blogs';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to save blog post');
    }

    await fetchBlogs();
  };

  // Filter logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categoriesList = Array.from(new Set(blogs.map((b) => b.category)));
  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === 'published').length;
  const draftCount = blogs.filter((b) => b.status === 'draft').length;

  return (
    <div className="min-h-screen bg-[#121212] text-[#FFFDF7]">
      {/* Top Header Navigation */}
      <header className="border-b border-[#C6A962]/20 bg-[#1A1A1A]/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6A962]/10 border border-[#C6A962]/30 flex items-center justify-center text-[#D4AF37]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-[#FFFDF7]">
                Kraftive Events Admin
              </h1>
              <p className="text-[11px] text-[#C6A962] tracking-wider uppercase">
                Content Management Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs text-[#FAF6ED]/70 hover:text-[#D4AF37] px-3.5 py-2 rounded-xl bg-[#242424] border border-[#C6A962]/20 transition-all"
            >
              <span>View Public Blog</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 px-4 py-2 rounded-xl bg-red-950/30 border border-red-500/20 hover:bg-red-950/50 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#1A1A1A] border border-[#C6A962]/25 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="text-xs font-medium text-[#C6A962] uppercase tracking-wider mb-2">Total Posts</div>
            <div className="text-3xl font-serif font-bold text-[#FFFDF7]">{totalCount}</div>
            <div className="absolute right-4 bottom-4 text-[#C6A962]/10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-emerald-500/25 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">Published</div>
            <div className="text-3xl font-serif font-bold text-[#FFFDF7]">{publishedCount}</div>
            <div className="absolute right-4 bottom-4 text-emerald-500/10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-amber-500/25 rounded-2xl p-6 relative overflow-hidden shadow-lg">
            <div className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-2">Drafts</div>
            <div className="text-3xl font-serif font-bold text-[#FFFDF7]">{draftCount}</div>
            <div className="absolute right-4 bottom-4 text-amber-500/10">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-[#1A1A1A] border border-[#C6A962]/20 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Filters */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title or keyword..."
                className="w-full bg-[#121212] border border-[#C6A962]/30 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#FFFDF7] placeholder-[#FFFDF7]/30 focus:outline-none focus:border-[#D4AF37]"
              />
              <svg className="w-4 h-4 text-[#C6A962]/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="w-full sm:w-auto bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-xs text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published Only</option>
              <option value="draft">Drafts Only</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto bg-[#121212] border border-[#C6A962]/30 rounded-xl px-3 py-2.5 text-xs text-[#FFFDF7] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleCreateNew}
            className="w-full md:w-auto bg-gradient-to-r from-[#D4AF37] via-[#C6A962] to-[#A8893A] text-[#121212] font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded-xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create New Article</span>
          </button>
        </div>

        {/* Blog Posts Data Table */}
        <div className="bg-[#1A1A1A] border border-[#C6A962]/20 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-[#C6A962] flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-sm font-medium">Loading articles...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400 text-sm">
              <p>{error}</p>
              <button
                onClick={fetchBlogs}
                className="mt-4 px-4 py-2 bg-red-950/40 border border-red-500/40 text-red-200 rounded-lg text-xs"
              >
                Try Again
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-16 text-center text-[#FAF6ED]/50 space-y-3">
              <svg className="w-12 h-12 text-[#C6A962]/30 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-base font-serif text-[#FFFDF7]">No articles found</p>
              <p className="text-xs text-[#FAF6ED]/40">
                {blogs.length === 0
                  ? "You haven't created any blog posts yet. Click 'Create New Article' to get started."
                  : 'Try adjusting your search query or filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#C6A962]/20 bg-[#141414] text-[11px] uppercase tracking-wider text-[#C6A962] font-medium">
                    <th className="py-4 px-6">Article</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Publish Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C6A962]/10 text-sm">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-[#222222] transition-colors">
                      {/* Title & Cover */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#121212] border border-[#C6A962]/20 flex-shrink-0">
                            <img
                              src={blog.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865'}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#FFFDF7] line-clamp-1">
                                {blog.title}
                              </span>
                              {blog.featured && (
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#FAF6ED]/50 line-clamp-1 mt-0.5">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 text-xs text-[#C6A962] font-medium whitespace-nowrap">
                        {blog.category}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {blog.status === 'published' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-950/60 text-amber-300 border border-amber-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Draft
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-[#FAF6ED]/60 whitespace-nowrap">
                        {blog.publishDate}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#FAF6ED]/60 hover:text-[#D4AF37] hover:bg-[#2A2A2A] rounded-lg transition-colors"
                            title="View on site"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>

                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-2 text-[#FAF6ED]/60 hover:text-[#D4AF37] hover:bg-[#2A2A2A] rounded-lg transition-colors cursor-pointer"
                            title="Edit article"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => handleDelete(blog.id)}
                            disabled={deletingId === blog.id}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                            title="Delete article"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
      <BlogEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBlog}
        editingBlog={editingBlog}
      />
    </div>
  );
}
