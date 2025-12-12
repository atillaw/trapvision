import AsyncStorage from '@react-native-async-storage/async-storage'
const BASE_URL = 'http://localhost:4000'

async function authHeaders() {
  const token = await AsyncStorage.getItem('token')
  return { Authorization: `Bearer ${token || ''}`, 'Content-Type': 'application/json' }
}

export async function addFavorite(payload: { id: string; name: string }) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/api/user/favorites`, { method: 'POST', headers, body: JSON.stringify(payload) })
  return res.json()
}

export async function listFavorites() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/api/user/favorites`, { headers })
  return res.json()
}

export async function savePlan(payload: { input: any; result: any }) {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/api/plans/save`, { method: 'POST', headers, body: JSON.stringify(payload) })
  return res.json()
}

export async function listPlans() {
  const headers = await authHeaders()
  const res = await fetch(`${BASE_URL}/api/plans`, { headers })
  return res.json()
}

export async function trackAdEvent(type: string, data?: any) {
  try {
    const headers = await authHeaders()
    await fetch(`${BASE_URL}/api/analytics/event`, { method: 'POST', headers, body: JSON.stringify({ type, data }) })
  } catch {}
}
