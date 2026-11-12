import { NextResponse } from 'next/server';
import { slugify, calculateReadTime } from '@/lib/blogs';
import { getAllBlogs, verifyAdminSession } from '@/lib/blogs-server';
import dbConnect from '@/lib/mongodb';
import BlogModel from '@/models/Blog';

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
    await dbConnect();
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

    const finalSlug = slug ? slugify(slug) : slugify(title);

    // Check if slug exists
    const existingBlog = await BlogModel.findOne({ slug: finalSlug });
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A post with this URL slug already exists. Please customize the slug.' },
        { status: 400 }
      );
    }

    const newBlog = await BlogModel.create({
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
    });

    const returnedBlog = newBlog.toObject();
    returnedBlog.id = returnedBlog._id.toString();
    delete returnedBlog._id;
    delete returnedBlog.__v;

    return NextResponse.json({ success: true, blog: returnedBlog });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: error?.message || 'An error occurred while creating the blog post' },
      { status: 500 }
    );
  }
}
