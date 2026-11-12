import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/blogs-server';
import dbConnect from '@/lib/mongodb';
import QueryModel from '@/models/Query';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const queries = await QueryModel.find().sort({ createdAt: -1 }).exec();
    
    // Map _id to id for consistency
    const mappedQueries = queries.map(q => {
      const query = q.toObject();
      query.id = query._id.toString();
      delete query._id;
      delete query.__v;
      return query;
    });

    return NextResponse.json({ queries: mappedQueries });
  } catch (error) {
    console.error('Error fetching queries:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching queries' },
      { status: 500 }
    );
  }
}
