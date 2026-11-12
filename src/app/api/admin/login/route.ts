import { NextResponse } from 'next/server';
import { generateSessionToken, COOKIE_NAME } from '@/lib/blogs-server';

function cleanEnv(val: string | undefined, fallback: string): string {
  if (!val) return fallback;
  return val.trim().replace(/^["']|["']$/g, '');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const expectedUsername = cleanEnv(process.env.ADMIN_USERNAME, 'admin');
    const expectedPassword = cleanEnv(process.env.ADMIN_PASSWORD, 'kraftive2026!');

    const submittedUsername = (username || '').trim();
    const submittedPassword = (password || '').trim();

    if (submittedUsername !== expectedUsername || submittedPassword !== expectedPassword) {
      console.warn(`[Admin Login Failed] Expected: "${expectedUsername}", Received: "${submittedUsername}". Check ADMIN_USERNAME & ADMIN_PASSWORD in secrets.`);
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = generateSessionToken();

    const response = NextResponse.json({ success: true, message: 'Logged in successfully' });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
