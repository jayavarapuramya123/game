import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true, index: true }, score: { type: Number, required: true, min: 0 }, duration: { type: Number, default: 0, min: 0 }, result: { type: String, enum: ['win', 'loss', 'draw', 'completed'], default: 'completed' }, xpEarned: { type: Number, default: 0 }, pointsEarned: { type: Number, default: 0 }, playedAt: { type: Date, default: Date.now, index: true } }, { timestamps: true });
schema.index({ game: 1, score: -1, playedAt: -1 }); schema.index({ user: 1, playedAt: -1 });
export default mongoose.model('Result', schema);
