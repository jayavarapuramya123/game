import Achievement from '../models/Achievement.js';
import UserAchievement from '../models/UserAchievement.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const definitions = [
  ['First Game','Complete your first game','🎮',1], ['First Win','Win your first game','🏆',2], ['High Scorer','Score 500 points in one game','⚡',3],
  ['10 Games Played','Play 10 games','🕹️',4], ['50 Games Played','Play 50 games','🔥',5], ['100 Games Played','Play 100 games','💎',6], ['Level 5','Reach level 5','🌟',7], ['Level 10','Reach level 10','👑',8], ['Perfect Score',"Reach a game's maximum score",'🎯',9]
];
export async function seedAchievements() { for (const [name, description, icon, n] of definitions) await Achievement.updateOne({name}, {$setOnInsert:{name,description,icon,requirement:`rule-${n}`,xpReward:50,pointsReward:100}}, {upsert:true}); }
export async function checkAchievements(userId, result, game, user) {
  const played = await (await import('../models/Result.js')).default.countDocuments({user:userId});
  const won = await (await import('../models/Result.js')).default.exists({user:userId,result:'win'});
  const predicates = [played >= 1, Boolean(won), result.score >= 500, played >= 10, played >= 50, played >= 100, user.level >= 5, user.level >= 10, result.score >= game.maxScore];
  const docs = await Achievement.find(); const unlocked=[];
  for (const [i, achievement] of docs.entries()) if (predicates[i]) {
    const entry=await UserAchievement.updateOne({user:userId,achievement:achievement._id},{$setOnInsert:{user:userId,achievement:achievement._id}},{upsert:true});
    if (entry.upsertedCount) { await User.updateOne({_id:userId},{$inc:{xp:achievement.xpReward,points:achievement.pointsReward}}); unlocked.push(achievement); }
  }
  return unlocked;
}
