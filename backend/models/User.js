import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 24, match: /^[a-zA-Z0-9_]+$/ },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true }, password: { type: String, required: true, select: false },
  avatar: { type: String, default: '' }, role: { type: String, enum: ['player', 'admin'], default: 'player' }, level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 }, points: { type: Number, default: 0 }, gamesPlayed: { type: Number, default: 0 }, wins: { type: Number, default: 0 }, losses: { type: Number, default: 0 }, bestScore: { type: Number, default: 0 }, lastActive: { type: Date, default: Date.now }
}, { timestamps: true });
userSchema.index({ xp: -1, level: -1 });
export default mongoose.model('User', userSchema);
