import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

export const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
