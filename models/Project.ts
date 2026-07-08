// models/Project.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  year: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  vercelUrl?: string;
  image: string; // URL or local path
  placeholder: string; // emoji fallback
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  githubUrl: { type: String, default: '' },
  vercelUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  placeholder: { type: String, default: '🔗' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema);
