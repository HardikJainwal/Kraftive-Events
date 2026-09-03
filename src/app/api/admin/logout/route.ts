import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/blogs-server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return response;
}
