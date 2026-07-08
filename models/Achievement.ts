// models/Achievement.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  meta: string;
  image: string; // URL or local path like /uploads/filename.jpg
  createdAt: Date;
}

const AchievementSchema = new Schema<IAchievement>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  meta: { type: String, required: true },
  image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Achievement ||
  mongoose.model<IAchievement>('Achievement', AchievementSchema);
