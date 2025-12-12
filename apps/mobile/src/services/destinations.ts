const BASE_URL = 'http://localhost:4000'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getDestination(name: string) {
  const key = `dest:${name}`
  try {
    const cached = await AsyncStorage.getItem(key)
    if (cached) return JSON.parse(cached)
  } catch {}
  const res = await fetch(`${BASE_URL}/api/destinations/${encodeURIComponent(name)}`)
  const data = await res.json()
  try { await AsyncStorage.setItem(key, JSON.stringify(data)) } catch {}
  return data
}
