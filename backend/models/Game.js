import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, slug: { type: String, required: true, unique: true, lowercase: true }, description: { type: String, required: true }, thumbnail: { type: String, default: '' }, category: { type: String, default: 'Arcade' }, difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' }, maxScore: { type: Number, default: 1000, min: 1 }, status: { type: String, enum: ['active', 'disabled'], default: 'active' }, plays: { type: Number, default: 0 } }, { timestamps: true });
schema.index({ status: 1, plays: -1 });
export default mongoose.model('Game', schema);
