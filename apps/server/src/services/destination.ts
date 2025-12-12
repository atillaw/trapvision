import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function getDestinationDetails(name: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro', generationConfig: { responseMimeType: 'application/json' } })
  const prompt = `Destination Page Generator for "${name}":
  - Provide bilingual ('tr' and 'en') fields
  - Include photo gallery captions, top reviews summary, pricing information
  - Provide recommended hotels and activities (names only, no external links)
  - Provide safety advisories and optimal visiting hours
  - Keep content minimalistic with cyber-blue tone hints`

  const res = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
  const text = res.response.text()
  return JSON.parse(text)
}

