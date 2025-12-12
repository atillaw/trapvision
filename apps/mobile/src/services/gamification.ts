const BASE_URL = 'http://localhost:4000'
import { recordInteraction, shouldShowInterstitial, shouldShowRewarded } from './api'

export async function getLeaderboard() {
  const res = await fetch(`${BASE_URL}/api/gamification/leaderboard`)
  return res.json()
}

export async function getChallenges() {
  const res = await fetch(`${BASE_URL}/api/gamification/challenges`)
  return res.json()
}

export function maybeShowInterstitial() {
  recordInteraction('navigation')
  return shouldShowInterstitial()
}

export function maybeShowRewarded() {
  recordInteraction('action')
  return shouldShowRewarded()
}
