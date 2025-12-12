type FeedItem = { id: string; destination?: string; budget?: string; tags?: string[]; caption?: { tr: string; en: string }; engagement?: number }
type UserProfile = { interests: string[]; budgetTier: 'economy' | 'mid' | 'premium' }

export function rankFeed(items: FeedItem[], user: UserProfile) {
  const interestSet = new Set(user.interests.map(s => s.toLowerCase()))
  return items
    .map(it => {
      const tagMatch = (it.tags || []).reduce((acc, t) => acc + (interestSet.has(t.toLowerCase()) ? 1 : 0), 0)
      const budgetScore = user.budgetTier === 'economy' ? (it.budget === 'low' ? 1 : 0) : user.budgetTier === 'mid' ? (it.budget === 'mid' ? 1 : 0) : (it.budget === 'high' ? 1 : 0)
      const engagementScore = Math.min(1, (it.engagement || 0) / 100)
      const trendingScore = ((it.tags || []).includes('trending') ? 1 : 0)
      const score = tagMatch * 2 + budgetScore + engagementScore + trendingScore
      return { ...it, _score: score }
    })
    .sort((a, b) => (b as any)._score - (a as any)._score)
}

