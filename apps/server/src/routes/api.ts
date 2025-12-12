import { Router } from 'express'
import { planTrip, reconstructTrip } from '../services/gemini.js'
import { register, login, me } from '../services/auth.js'
import { requireAuth } from '../middleware/auth.js'
import { analyzePhoto } from '../services/photo.js'
import { getDestinationDetails } from '../services/destination.js'
import { getLeaderboard, getChallenges } from '../services/gamification.js'
import { conciergeChat } from '../services/assistant.js'
import { addFavorite, listFavorites, savePlan, listPlans } from '../services/store.js'
import { rankFeed } from '../services/feed.js'
import { trackEvent, reportSummary } from '../services/analytics.js'

export const router = Router()

router.post('/plan', async (req, res) => {
  try {
    const { budgetRange, dates, destination, interests } = req.body
    const result = await planTrip({ budgetRange, dates, destination, interests })
    res.json(result)
  } catch (err: any) {
    res.status(500).json({ error: 'plan_failed', message: err?.message })
  }
})

router.post('/reconstruct', async (req, res) => {
  try {
    const { imageBase64 } = req.body
    const result = await reconstructTrip({ imageBase64 })
    res.json(result)
  } catch (err: any) {
    res.status(500).json({ error: 'reconstruct_failed', message: err?.message })
  }
})


router.post('/auth/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body
    const result = await register({ email, password, displayName })
    res.json(result)
  } catch (err: any) {
    res.status(400).json({ error: err?.message || 'register_failed' })
  }
})

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await login({ email, password })
    res.json(result)
  } catch (err: any) {
    res.status(401).json({ error: err?.message || 'login_failed' })
  }
})

router.get('/user/me', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user.id
    const result = me(userId)
    res.json(result)
  } catch (err: any) {
    res.status(404).json({ error: err?.message || 'me_failed' })
  }
})

router.post('/photo/metadata', async (req, res) => {
  try {
    const { imageBase64 } = req.body
    const meta = await analyzePhoto({ imageBase64 })
    res.json(meta)
  } catch (err: any) {
    res.status(500).json({ error: 'photo_meta_failed', message: err?.message })
  }
})

router.get('/destinations/:name', async (req, res) => {
  try {
    const d = await getDestinationDetails(req.params.name)
    res.json(d)
  } catch (err: any) {
    res.status(404).json({ error: 'destination_failed', message: err?.message })
  }
})

router.get('/gamification/leaderboard', async (_req, res) => {
  res.json(getLeaderboard())
})

router.get('/gamification/challenges', async (_req, res) => {
  res.json(getChallenges())
})

router.post('/user/favorites', requireAuth, async (req, res) => {
  const userId = (req as any).user.id
  const { id, name } = req.body
  res.json(addFavorite(userId, { id, name }))
})

router.get('/user/favorites', requireAuth, async (req, res) => {
  const userId = (req as any).user.id
  res.json(listFavorites(userId))
})

router.post('/plans/save', requireAuth, async (req, res) => {
  const userId = (req as any).user.id
  const { input, result } = req.body
  res.json(savePlan(userId, { id: String(Date.now()), input, result }))
})

router.get('/plans', requireAuth, async (req, res) => {
  const userId = (req as any).user.id
  res.json(listPlans(userId))
})

router.post('/feed/rank', async (req, res) => {
  const { items, user } = req.body || {}
  res.json(rankFeed(items || [], user || { interests: [], budgetTier: 'mid' }))
})

router.post('/analytics/event', async (req, res) => {
  const { type, userId, data } = req.body || {}
  res.json(trackEvent({ type: String(type || 'unknown'), ts: Date.now(), userId, data }))
})

router.get('/analytics/report', async (_req, res) => {
  res.json(reportSummary())
})
router.post('/concierge/chat', requireAuth, async (req, res) => {
  const userId = (req as any).user.id
  const { input, language } = req.body
  const out = await conciergeChat(userId, input, language || 'en')
  res.json(out)
})
