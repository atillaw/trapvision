import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization || ''
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : ''
  if (!token) return res.status(401).json({ error: 'no_token' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev') as any
    ;(req as any).user = payload
    next()
  } catch {
    res.status(401).json({ error: 'invalid_token' })
  }
}

