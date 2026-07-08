// models/Profile.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  heroImage: string;
  aboutImage: string;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
  heroImage: { type: String, default: '' },
  aboutImage: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Profile ||
  mongoose.model<IProfile>('Profile', ProfileSchema);
