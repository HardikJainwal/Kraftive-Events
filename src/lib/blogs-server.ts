import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { BlogPost, slugify, calculateReadTime } from './blogs';

// ---------------------------------------------------------------------------
// Persistent blog data storage
// ---------------------------------------------------------------------------
// Blog data is stored OUTSIDE the git-tracked project directory so that
// running `git pull` + `npm run build` during deployments never overwrites
// blogs that were created via the admin panel.
//
// Resolution order for the persistent data directory:
//   1. BLOG_DATA_DIR  – explicit env var (recommended for production)
//   2. <project-root>/.kraftive-data  – auto-created sibling directory
//
// On first run (or if the persistent file is missing), we seed it from the
// git-tracked `data/blogs.json` so existing content is preserved.
// ---------------------------------------------------------------------------

/** Git-tracked seed file – used only for initial seeding */
const SEED_FILE = path.join(process.cwd(), 'data', 'blogs.json');

/** Resolve the persistent data directory */
function getPersistentDir(): string {
  if (process.env.BLOG_DATA_DIR) {
    return process.env.BLOG_DATA_DIR;
  }
  // Place the data dir one level up from the project, or as a dot-dir inside
  // the project root. Using a dot-prefixed folder keeps it hidden and out of
  // the way, and it's gitignored.
  return path.join(process.cwd(), '.kraftive-data');
}

/** Full path to the live blogs JSON file */
function getBlogsFilePath(): string {
  return path.join(getPersistentDir(), 'blogs.json');
}

/**
 * Ensure the persistent data file exists. If it doesn't, create the directory
 * and seed it from the git-tracked data file.
 */
async function ensurePersistentFile(): Promise<string> {
  const filePath = getBlogsFilePath();

  try {
    await fs.access(filePath);
    // File already exists – nothing to do
    return filePath;
  } catch {
    // File doesn't exist yet – need to seed it
  }

  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  // Try to copy seed data
  try {
    const seedContent = await fs.readFile(SEED_FILE, 'utf-8');
    // Validate it's valid JSON before writing
    JSON.parse(seedContent);
    await fs.writeFile(filePath, seedContent, 'utf-8');
    console.log(`[blogs] Seeded persistent blog data at ${filePath}`);
  } catch {
    // No seed file or invalid – start with empty array
    await fs.writeFile(filePath, '[]', 'utf-8');
    console.log(`[blogs] Created empty persistent blog data at ${filePath}`);
  }

  return filePath;
}

const COOKIE_NAME = 'admin_session';

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const filePath = await ensurePersistentFile();
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const blogs: BlogPost[] = JSON.parse(fileContent);
    return blogs.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error reading blogs data:', error);
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
    const filePath = await ensurePersistentFile();
    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing blogs data:', error);
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
