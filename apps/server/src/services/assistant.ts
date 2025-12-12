import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const memory = new Map<string, { messages: { role: 'user' | 'model'; text: string }[] }>()

export async function conciergeChat(userId: string, input: string, language: 'tr' | 'en' = 'en') {
  const ctx = memory.get(userId) || { messages: [] }
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
  const system = `You are TRIPVERSE Gemini Concierge. Provide 24/7 multilingual travel assistance with context-aware memory, safety guidance, and emergency routing. Respond bilingually in TR and EN.`
  const contents = [
    { role: 'user', parts: [{ text: system }] },
    ...ctx.messages.map(m => ({ role: m.role, parts: [{ text: m.text }] } as any)),
    { role: 'user', parts: [{ text: input }] }
  ]
  const res = await model.generateContent({ contents })
  const text = res.response.text()
  ctx.messages.push({ role: 'user', text: input })
  ctx.messages.push({ role: 'model', text })
  memory.set(userId, ctx)
  return { tr: text, en: text }
}

