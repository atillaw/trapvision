import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

type User = { id: string; email: string; passwordHash: string; displayName?: string; badges?: string[]; level?: number }
const users = new Map<string, User>()

export async function register(input: { email: string; password: string; displayName?: string }) {
  const existing = Array.from(users.values()).find(u => u.email === input.email)
  if (existing) throw new Error('email_exists')
  const hash = await bcrypt.hash(input.password, 10)
  const user: User = { id: uuid(), email: input.email, passwordHash: hash, displayName: input.displayName, badges: [], level: 1 }
  users.set(user.id, user)
  const token = signToken({ id: user.id, email: user.email })
  return { token, user: { id: user.id, email: user.email, displayName: user.displayName, level: user.level, badges: user.badges } }
}

export async function login(input: { email: string; password: string }) {
  const user = Array.from(users.values()).find(u => u.email === input.email)
  if (!user) throw new Error('invalid_credentials')
  const ok = await bcrypt.compare(input.password, user.passwordHash)
  if (!ok) throw new Error('invalid_credentials')
  const token = signToken({ id: user.id, email: user.email })
  return { token, user: { id: user.id, email: user.email, displayName: user.displayName, level: user.level, badges: user.badges } }
}

export function me(userId: string) {
  const user = users.get(userId)
  if (!user) throw new Error('not_found')
  return { id: user.id, email: user.email, displayName: user.displayName, level: user.level, badges: user.badges }
}

function signToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev', { expiresIn: '7d' })
}

