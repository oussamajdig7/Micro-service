import mongoose from "mongoose";

const EmpruntSchema = new mongoose.Schema({
  userName: String,
  bookId: String,
  dateEmprunt: { type: Date, default: Date.now },
  dateRetour: { type: Date, default: null },
});

export default mongoose.model("Emprunt", EmpruntSchema);