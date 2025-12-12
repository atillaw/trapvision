type Event = { type: string; ts: number; userId?: string; data?: any }
const events: Event[] = []

export function trackEvent(e: Event) {
  events.push(e)
  return { ok: true }
}

export function reportSummary() {
  const byType: Record<string, number> = {}
  for (const e of events) byType[e.type] = (byType[e.type] || 0) + 1
  return { total: events.length, byType }
}

