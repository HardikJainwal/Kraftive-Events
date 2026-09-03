import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { BlogPost } from '@/lib/blogs';
import { getPublishedBlogs } from '@/lib/blogs-server';
import BlogClientView from '@/components/blog/BlogClientView';

export const metadata: Metadata = {
  title: 'Blog & Insights | Kraftive Events & Media',
  description: 'Explore the latest insights, event management trends, venue sourcing strategies, and experiential marketing tips from Kraftive Events & Media Mumbai.',
};

export const revalidate = 0; // Fresh blog data on request

export default async function BlogPage() {
  const blogs: BlogPost[] = await getPublishedBlogs();
  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-cream/30">
      {/* Blog Page Hero Banner */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-charcoal text-ivory">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C6A962_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10 text-center">
          <span className="inline-block font-body text-xs md:text-sm uppercase tracking-[0.25em] text-gold mb-3 font-semibold">
            Industry Insights & Stories
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            The Kraftive <span className="gold-gradient-text">Journal</span>
          </h1>
          <p className="max-w-2xl mx-auto font-body text-ivory/70 text-base md:text-lg leading-relaxed">
            Expert commentary, event management breakdowns, venue sourcing strategies, and trend forecasts from Mumbai’s premier event agency.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 space-y-16">
        {/* Featured Post Card (if exists) */}
        {featuredBlog && (
          <div className="glass-panel-solid rounded-3xl overflow-hidden shadow-xl border border-gold/20 hover:border-gold/40 transition-all duration-300 group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 relative h-72 lg:h-[420px] overflow-hidden">
                <Image
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-charcoal font-semibold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    Featured Post
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 lg:p-12 space-y-5">
                <div className="flex items-center gap-3 text-xs text-charcoal/60">
                  <span className="font-semibold text-gold uppercase tracking-wider">{featuredBlog.category}</span>
                  <span>•</span>
                  <span>{featuredBlog.readTime}</span>
                </div>

                <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal group-hover:text-gold-dark transition-colors leading-tight">
                  <Link href={`/blog/${featuredBlog.slug}`}>
                    {featuredBlog.title}
                  </Link>
                </h2>

                <p className="text-charcoal/70 text-sm md:text-base leading-relaxed line-clamp-3">
                  {featuredBlog.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-charcoal/50 font-medium">
                    By {featuredBlog.author} — {featuredBlog.publishDate}
                  </span>

                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-dark hover:text-gold transition-colors"
                  >
                    <span>Read Article</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Client Interactive Filter & Grid View */}
        <BlogClientView initialBlogs={blogs} />
      </div>
    </div>
  );
}
