const BASE_URL = 'http://localhost:4000'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function analyzePhoto({ imageBase64 }: { imageBase64: string }) {
  const key = `photo:${imageBase64.slice(0, 40)}`
  try {
    const cached = await AsyncStorage.getItem(key)
    if (cached) return JSON.parse(cached)
  } catch {}
  const res = await fetch(`${BASE_URL}/api/photo/metadata`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageBase64 }) })
  const data = await res.json()
  try { await AsyncStorage.setItem(key, JSON.stringify(data)) } catch {}
  return data
}

