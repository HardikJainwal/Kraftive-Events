import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const rawUri = process.env.KRAFTIVE_DB_URI;

  if (!rawUri) {
    const errMsg = 'Please define the KRAFTIVE_DB_URI environment variable inside .env.local or your deployment settings';
    console.error(`[MongoDB Config Error]: ${errMsg}`);
    throw new Error(errMsg);
  }

  const MONGODB_URI = rawUri.trim().replace(/^["']|["']$/g, '');

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, // Timeout after 8s instead of hanging for 30s
      connectTimeoutMS: 8000,
      family: 4, // Prefer IPv4 to avoid IPv6 DNS hangs on cloud hosts
    };

    console.log('[MongoDB] Connecting to MongoDB Atlas...');
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('[MongoDB] Connected successfully to Atlas!');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('[MongoDB Connection Failed]:', err?.message || err);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
