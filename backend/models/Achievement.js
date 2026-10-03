import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, description: String, icon: { type: String, default: '✦' }, requirement: { type: String, required: true }, xpReward: { type: Number, default: 0 }, pointsReward: { type: Number, default: 0 } }, { timestamps: true });
export default mongoose.model('Achievement', schema);
