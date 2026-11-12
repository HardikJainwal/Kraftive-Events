import { NextResponse } from 'next/server';
import { slugify, calculateReadTime } from '@/lib/blogs';
import { verifyAdminSession } from '@/lib/blogs-server';
import dbConnect from '@/lib/mongodb';
import BlogModel from '@/models/Blog';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const currentBlog = await BlogModel.findById(id);
    if (!currentBlog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const newSlug = body.slug ? slugify(body.slug) : currentBlog.slug;

    // Check slug collision with other posts
    if (newSlug !== currentBlog.slug) {
      const existing = await BlogModel.findOne({ slug: newSlug });
      if (existing) {
        return NextResponse.json(
          { error: 'Another post already uses this URL slug. Please choose a unique slug.' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.slug !== undefined) updateData.slug = newSlug;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt.trim();
    if (body.content !== undefined) {
      updateData.content = body.content.trim();
      updateData.readTime = calculateReadTime(body.content);
    }
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.coverImage !== undefined) updateData.coverImage = body.coverImage;
    if (body.author !== undefined) updateData.author = body.author.trim();
    if (body.status !== undefined) updateData.status = body.status;
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedBlog) {
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 500 }
      );
    }

    const returnedBlog = updatedBlog.toObject();
    returnedBlog.id = returnedBlog._id.toString();
    delete returnedBlog._id;
    delete returnedBlog.__v;

    return NextResponse.json({ success: true, blog: returnedBlog });
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
    await dbConnect();
    const { id } = await params;
    
    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
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
