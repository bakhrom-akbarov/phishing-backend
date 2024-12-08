import { Schema } from 'mongoose';

export const PhishingSchema = new Schema({
  email: { type: String, required: true },
  linkClicked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
