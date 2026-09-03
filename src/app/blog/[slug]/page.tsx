import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getBlogBySlug, getPublishedBlogs } from '@/lib/blogs-server';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== 'published') {
    return { title: 'Article Not Found | Kraftive Events' };
  }

  return {
    title: `${blog.title} | Kraftive Events Journal`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== 'published') {
    notFound();
  }

  const allBlogs = await getPublishedBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  // Markdown content parser helper
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="font-display text-2xl font-bold text-charcoal mt-8 mb-4">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-display text-3xl font-bold text-charcoal mt-10 mb-4 border-b border-gold/20 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-6 p-6 rounded-2xl bg-cream/70 border-l-4 border-gold text-charcoal-light italic font-serif text-lg leading-relaxed shadow-sm">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((line) => line.replace(/^- /, '').trim());
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc list-inside text-charcoal/80 text-base leading-relaxed pl-2">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-charcoal/80 text-base md:text-lg leading-relaxed mb-6">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-ivory">
      {/* Top Banner & Breadcrumb */}
      <section className="bg-charcoal text-ivory py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10 space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold hover:text-gold-light transition-colors mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Articles</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-ivory/60">
            <span className="font-semibold text-gold uppercase tracking-wider px-3 py-1 bg-gold/10 rounded-full border border-gold/30">
              {blog.category}
            </span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight text-ivory">
            {blog.title}
          </h1>

          <div className="pt-4 flex items-center gap-4 text-xs text-ivory/70 border-t border-ivory/15">
            <span className="font-medium text-ivory">By {blog.author}</span>
            <span>•</span>
            <span>Published on {blog.publishDate}</span>
          </div>
        </div>
      </section>

      {/* Main Article Container */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-12">
        {/* Cover Image */}
        <div className="relative w-full h-[320px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-gold/20">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Excerpt Lead */}
        {blog.excerpt && (
          <p className="font-serif text-xl md:text-2xl text-gold-dark italic leading-relaxed border-l-4 border-gold pl-6 py-2">
            {blog.excerpt}
          </p>
        )}

        {/* Formatted Content */}
        <article className="prose prose-lg max-w-none text-charcoal/90 leading-relaxed font-body">
          {renderFormattedContent(blog.content)}
        </article>

        {/* Plan Event CTA Banner */}
        <div className="glass-panel-solid p-8 md:p-12 rounded-3xl border border-gold/30 text-center space-y-6 shadow-xl bg-gradient-to-br from-cream via-ivory to-champagne/30">
          <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
            Kraftive Events & Media
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal">
            Planning an Upcoming Corporate Event or Exhibition?
          </h3>
          <p className="max-w-xl mx-auto text-charcoal/70 text-sm md:text-base">
            Let our team of senior event strategists and fabrication experts elevate your next brand experience.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gold text-charcoal font-semibold text-xs uppercase tracking-widest px-8 py-4 border border-gold hover:bg-gold-dark hover:border-gold-dark transition-all duration-300 shadow-md"
            >
              <span>Get In Touch</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="pt-12 border-t border-gold/20 space-y-8">
            <h3 className="font-display text-2xl font-bold text-charcoal">
              Related Articles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <div key={rel.id} className="bg-cream/40 rounded-2xl p-4 border border-gold/20 flex flex-col justify-between hover:border-gold transition-colors">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-gold-dark">{rel.category}</span>
                    <h4 className="font-display text-base font-bold text-charcoal line-clamp-2">
                      <Link href={`/blog/${rel.slug}`} className="hover:text-gold-dark transition-colors">
                        {rel.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="mt-4 text-xs font-semibold text-gold-dark hover:text-gold inline-flex items-center gap-1"
                  >
                    <span>Read More</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
