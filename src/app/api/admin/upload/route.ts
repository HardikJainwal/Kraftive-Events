import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/blogs-server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPEG, PNG, WEBP, GIF, or SVG image.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Try optional local disk write for dev environment
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
      await fs.mkdir(uploadsDir, { recursive: true });

      const ext = path.extname(file.name) || '.jpg';
      const sanitizedBase = path.basename(file.name, ext).replace(/[^\w-]/g, '_');
      const filename = `${sanitizedBase}_${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, filename);

      await fs.writeFile(filePath, buffer);
    } catch (fsErr) {
      console.warn('[Upload Route] Serverless filesystem write bypassed:', fsErr);
    }

    return NextResponse.json({ success: true, url: base64Image });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
