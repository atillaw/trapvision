import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://localhost:4000'

export async function register(payload: { email: string; password: string; displayName?: string }) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await res.json()
  if (data?.token) await AsyncStorage.setItem('token', data.token)
  return data
}

export async function login(payload: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await res.json()
  if (data?.token) await AsyncStorage.setItem('token', data.token)
  return data
}

export async function me() {
  const token = await AsyncStorage.getItem('token')
  const res = await fetch(`${BASE_URL}/api/user/me`, { headers: { Authorization: `Bearer ${token || ''}` } })
  return res.json()
}
