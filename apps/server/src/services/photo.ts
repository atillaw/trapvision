import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function analyzePhoto(input: { imageBase64: string }) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro', generationConfig: { responseMimeType: 'application/json' } })
  const prompt = `Advanced Travel Photo Analysis:
  - Geospatial recognition: landmark and neighborhood detection
  - Proximity-based attraction mapping: nearby points of interest
  - Temporal analysis: lighting, season, crowd estimation
  - Budget tier classification: economy/mid-range/premium
  - Cultural context generation and etiquette hints
  - Safety advisory and optimal visiting hours
  - Smart tags and concise travel insight
  Output bilingual fields ('tr' and 'en').`

  const imagePart = { inlineData: { data: input.imageBase64, mimeType: 'image/jpeg' } }
  const res = await model.generateContent({
    contents: [
      { role: 'user', parts: [imagePart as any, { text: prompt }] }
    ]
  })
  const text = res.response.text()
  return JSON.parse(text)
}
