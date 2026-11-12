import 'server-only';
import { cookies } from 'next/headers';
import { BlogPost, slugify, calculateReadTime } from './blogs';
import dbConnect from './mongodb';
import BlogModel from '@/models/Blog';

const COOKIE_NAME = 'admin_session';

/**
 * Helper to map MongoDB _id to string id
 */
function mapBlog(doc: any): BlogPost {
  const blog = doc.toObject();
  blog.id = blog._id.toString();
  delete blog._id;
  delete blog.__v;
  return blog as BlogPost;
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    await dbConnect();
    const blogs = await BlogModel.find().sort({ publishDate: -1 }).exec();
    return blogs.map(mapBlog);
  } catch (error) {
    console.error('Error reading blogs data:', error);
    return [];
  }
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  try {
    await dbConnect();
    const blogs = await BlogModel.find({ status: 'published' }).sort({ publishDate: -1 }).exec();
    return blogs.map(mapBlog);
  } catch (error) {
    console.error('Error reading published blogs data:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await dbConnect();
    const blog = await BlogModel.findOne({ slug }).exec();
    return blog ? mapBlog(blog) : null;
  } catch (error) {
    console.error(`Error reading blog by slug ${slug}:`, error);
    return null;
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    
    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    const expectedToken = Buffer.from(
      `${process.env.ADMIN_USERNAME || 'admin'}:${process.env.ADMIN_PASSWORD || 'kraftive2026!'}:${process.env.SESSION_SECRET || 'secret'}`
    ).toString('base64');

    return sessionCookie.value === expectedToken;
  } catch {
    return false;
  }
}

export function generateSessionToken(): string {
  return Buffer.from(
    `${process.env.ADMIN_USERNAME || 'admin'}:${process.env.ADMIN_PASSWORD || 'kraftive2026!'}:${process.env.SESSION_SECRET || 'secret'}`
  ).toString('base64');
}

export { COOKIE_NAME, slugify, calculateReadTime };
