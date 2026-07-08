// models/JourneyItem.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IJourneyItem extends Document {
  period: string;
  title: string;
  org: string;
  bullets: string[];
  doi?: string;
  createdAt: Date;
}

const JourneyItemSchema = new Schema<IJourneyItem>({
  period: { type: String, required: true },
  title: { type: String, required: true },
  org: { type: String, required: true },
  bullets: { type: [String], default: [] },
  doi: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.JourneyItem ||
  mongoose.model<IJourneyItem>('JourneyItem', JourneyItemSchema);
