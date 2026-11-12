import mongoose, { Schema, Document } from 'mongoose';
import { BlogPost } from '@/lib/blogs';

export interface IBlog extends Omit<BlogPost, 'id'>, Document {
  // We omit 'id' from BlogPost because MongoDB uses '_id'.
  // We'll map _id to id when returning data.
}

const BlogSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  coverImage: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
  readTime: { type: String, required: true },
  status: { type: String, enum: ['published', 'draft'], required: true },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
