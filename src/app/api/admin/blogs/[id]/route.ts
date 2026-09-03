import { NextResponse } from 'next/server';
import { slugify, calculateReadTime } from '@/lib/blogs';
import {
  getAllBlogs,
  saveBlogs,
  verifyAdminSession,
} from '@/lib/blogs-server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const blogs = await getAllBlogs();

    const blogIndex = blogs.findIndex((b) => b.id === id);
    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const currentBlog = blogs[blogIndex];
    const newSlug = body.slug ? slugify(body.slug) : currentBlog.slug;

    // Check slug collision with other posts
    if (newSlug !== currentBlog.slug && blogs.some((b) => b.slug === newSlug && b.id !== id)) {
      return NextResponse.json(
        { error: 'Another post already uses this URL slug. Please choose a unique slug.' },
        { status: 400 }
      );
    }

    const updatedBlog = {
      ...currentBlog,
      title: body.title !== undefined ? body.title.trim() : currentBlog.title,
      slug: newSlug,
      excerpt: body.excerpt !== undefined ? body.excerpt.trim() : currentBlog.excerpt,
      content: body.content !== undefined ? body.content.trim() : currentBlog.content,
      category: body.category !== undefined ? body.category.trim() : currentBlog.category,
      coverImage: body.coverImage !== undefined ? body.coverImage : currentBlog.coverImage,
      author: body.author !== undefined ? body.author.trim() : currentBlog.author,
      status: body.status !== undefined ? body.status : currentBlog.status,
      featured: body.featured !== undefined ? Boolean(body.featured) : currentBlog.featured,
      readTime: body.content ? calculateReadTime(body.content) : currentBlog.readTime,
    };

    blogs[blogIndex] = updatedBlog;
    const success = await saveBlogs(blogs);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const blogs = await getAllBlogs();

    const filteredBlogs = blogs.filter((b) => b.id !== id);

    if (blogs.length === filteredBlogs.length) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const success = await saveBlogs(filteredBlogs);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the blog post' },
      { status: 500 }
    );
  }
}
