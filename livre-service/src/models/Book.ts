import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  available: { type: Boolean, default: true }
});

export default mongoose.model('Book', BookSchema);