import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { BlogPost, slugify, calculateReadTime } from './blogs';

const BLOGS_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.json');
const COOKIE_NAME = 'admin_session';

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(BLOGS_FILE_PATH, 'utf-8');
    const blogs: BlogPost[] = JSON.parse(fileContent);
    return blogs.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error reading blogs.json:', error);
    return [];
  }
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter((blog) => blog.status === 'published');
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const allBlogs = await getAllBlogs();
  return allBlogs.find((blog) => blog.slug === slug) || null;
}

export async function saveBlogs(blogs: BlogPost[]): Promise<boolean> {
  try {
    await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(blogs, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing blogs.json:', error);
    return false;
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
