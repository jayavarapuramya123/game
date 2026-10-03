export const xpForNextLevel = (level) => 250 + Math.max(0, level - 1) * 100;
export function progression(xp) { let level = 1, remaining = xp; while (remaining >= xpForNextLevel(level)) { remaining -= xpForNextLevel(level); level++; } return { level, currentLevelXp: remaining, nextLevelXp: xpForNextLevel(level) }; }
export function gameRewards(score, result) { return { xp: 25 + Math.floor(Math.max(0, score) / 10) + (result === 'win' ? 30 : 0), points: 10 + Math.floor(Math.max(0, score) / 5) + (result === 'win' ? 25 : 0) }; }
