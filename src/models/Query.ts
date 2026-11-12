import mongoose, { Schema, Document } from 'mongoose';

export interface IQuery extends Document {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  otherEventType?: string;
  eventDate?: string;
  guestCount?: string;
  notes?: string;
  message?: string;
  ticketId?: string;
  timestamp?: string;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuerySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  eventType: { type: String },
  otherEventType: { type: String },
  eventDate: { type: String },
  guestCount: { type: String },
  notes: { type: String },
  message: { type: String },
  ticketId: { type: String },
  timestamp: { type: String },
  source: { type: String, default: 'Website Form' }
}, {
  timestamps: true,
});

export default mongoose.models.Query || mongoose.model<IQuery>('Query', QuerySchema);
