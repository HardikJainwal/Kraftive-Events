'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blogs';

interface BlogClientViewProps {
  initialBlogs: BlogPost[];
}

export default function BlogClientView({ initialBlogs }: BlogClientViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(initialBlogs.map((b) => b.category)))];

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      blog.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Search and Category Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-gold/20">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold text-charcoal shadow-md scale-105'
                  : 'bg-cream/80 text-charcoal/70 border border-gold/20 hover:border-gold hover:text-gold-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-ivory border border-gold/30 rounded-full pl-10 pr-4 py-2.5 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold shadow-sm"
          />
          <svg
            className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="py-16 text-center text-charcoal/60 bg-cream/50 rounded-3xl border border-gold/20">
          <p className="font-display text-xl font-semibold mb-2">No articles matched your criteria</p>
          <p className="text-xs">Try searching for a different keyword or select another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-ivory rounded-2xl border border-gold/20 overflow-hidden shadow-md hover:shadow-xl hover:border-gold/50 transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image Container */}
              <Link href={`/blog/${blog.slug}`} className="relative h-52 w-full overflow-hidden block">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-charcoal/80 backdrop-blur-md text-gold text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-gold/30">
                    {blog.category}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-charcoal/50">
                    <span>{blog.publishDate}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/15 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-charcoal/60">
                    By {blog.author}
                  </span>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-gold-dark hover:text-gold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
