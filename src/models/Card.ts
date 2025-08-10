import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    example1: String,
    example2: String,
    other: String,
  },
  { timestamps: true }
);

export default mongoose.models.Card || mongoose.model('Card', CardSchema);
