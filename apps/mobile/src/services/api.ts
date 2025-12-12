import { Platform } from 'react-native'
const ENV_URL = (globalThis as any)?.process?.env?.EXPO_PUBLIC_API_URL as string | undefined
const BASE_URL = ENV_URL || (Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000')

let interactionCount = 0
let lastInterstitialTs = 0
let lastRewardedTs = 0

export function recordInteraction(kind: 'navigation' | 'action') {
  interactionCount += 1
}

export function shouldShowInterstitial(now = Date.now()) {
  const naturalBreak = interactionCount % 7 === 0
  const intervalOk = now - lastInterstitialTs > 120000
  const show = naturalBreak && intervalOk
  if (show) lastInterstitialTs = now
  return show
}

export function shouldShowRewarded(now = Date.now()) {
  const intervalOk = now - lastRewardedTs > 300000
  const show = intervalOk
  if (show) lastRewardedTs = now
  return show
}

export async function planTrip(payload: {
  budgetRange: string
  dates: { start: string; end: string }
  destination: string
  interests: string[]
}) {
  const res = await fetch(`${BASE_URL}/api/plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return res.json()
}

export async function reconstructTrip(payload: { imageBase64: string }) {
  const res = await fetch(`${BASE_URL}/api/reconstruct`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return res.json()
}

export async function rankFeed(items: any[], user: { interests: string[]; budgetTier: 'economy' | 'mid' | 'premium' }) {
  const res = await fetch(`${BASE_URL}/api/feed/rank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, user })
  })
  return res.json()
}

export async function conciergeChat(input: string, language: 'tr' | 'en' = 'en', token?: string) {
  const headers: any = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${BASE_URL}/api/concierge/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ input, language })
  })
  return res.json()
}
