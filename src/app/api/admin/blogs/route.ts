import { NextResponse } from 'next/server';
import { BlogPost, slugify, calculateReadTime } from '@/lib/blogs';
import {
  getAllBlogs,
  saveBlogs,
  verifyAdminSession,
} from '@/lib/blogs-server';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blogs = await getAllBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      coverImage,
      author,
      status,
      featured,
    } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Title, content, and category are required' },
        { status: 400 }
      );
    }

    const blogs = await getAllBlogs();
    const finalSlug = slug ? slugify(slug) : slugify(title);

    // Check if slug exists
    if (blogs.some((b) => b.slug === finalSlug)) {
      return NextResponse.json(
        { error: 'A post with this URL slug already exists. Please customize the slug.' },
        { status: 400 }
      );
    }

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt ? excerpt.trim() : title.slice(0, 120) + '...',
      content: content.trim(),
      category: category.trim(),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      author: author ? author.trim() : 'Kraftive Editorial',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(content),
      status: status === 'published' ? 'published' : 'draft',
      featured: Boolean(featured),
    };

    blogs.unshift(newBlog);
    const success = await saveBlogs(blogs);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save blog post to database file' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the blog post' },
      { status: 500 }
    );
  }
}
