type LeaderboardEntry = { userId: string; displayName?: string; score: number; level: number; badges: string[]; xp: number; achievements: string[] }

const leaderboard: LeaderboardEntry[] = []

export function recordActivity(userId: string, points: number, displayName?: string) {
  const entry = leaderboard.find(l => l.userId === userId)
  if (!entry) {
    leaderboard.push({ userId, displayName, score: points, level: 1, badges: [], xp: points, achievements: [] })
  } else {
    entry.score += points
    entry.xp += points
    entry.level = Math.min(100, 1 + Math.floor(entry.score / 100))
  }
}

export function awardBadge(userId: string, badge: string) {
  const entry = leaderboard.find(l => l.userId === userId)
  if (!entry) return
  if (!entry.badges.includes(badge)) entry.badges.push(badge)
}

export function unlockAchievement(userId: string, achievement: string) {
  const entry = leaderboard.find(l => l.userId === userId)
  if (!entry) return
  if (!entry.achievements.includes(achievement)) entry.achievements.push(achievement)
}

export function getLeaderboard(limit = 50) {
  return leaderboard.sort((a, b) => b.score - a.score).slice(0, limit)
}

export function getChallenges() {
  return [
    { id: 'city-explorer', title: { tr: 'Şehir Kaşifi', en: 'City Explorer' }, points: 50 },
    { id: 'mountain-hiker', title: { tr: 'Dağ Yürüyüşçüsü', en: 'Mountain Hiker' }, points: 80 },
    { id: 'coastal-lover', title: { tr: 'Sahil Sever', en: 'Coastal Lover' }, points: 40 }
  ]
}
