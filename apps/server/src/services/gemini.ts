import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const MODEL_PLANNER = 'gemini-1.5-pro'
const MODEL_VISION = 'gemini-1.5-pro'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const plannerSchema = {
  type: SchemaType.OBJECT,
  properties: {
    plan: bilingualTextSchema(),
    transport: bilingualListSchema(),
    accommodation: bilingualListSchema(),
    dining: bilingualListSchema(),
    activities: bilingualListSchema(),
    itinerary: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          hour: { type: SchemaType.STRING },
          activity: bilingualTextSchema(),
          bufferMinutes: { type: SchemaType.NUMBER }
        },
        required: ['hour', 'activity']
      }
    },
    costEstimate: {
      type: SchemaType.OBJECT,
      properties: {
        summary: bilingualTextSchema(),
        currency: { type: SchemaType.STRING },
        total: { type: SchemaType.NUMBER },
        breakdown: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              label: bilingualTextSchema(),
              amount: { type: SchemaType.NUMBER }
            },
            required: ['label', 'amount']
          }
        }
      },
      required: ['summary', 'currency']
    },
    weatherForecast: bilingualTextSchema(),
    contingencies: bilingualListSchema(),
    crowdPrediction: bilingualTextSchema(),
    safetyWarnings: bilingualTextSchema(),
    localRegulations: bilingualListSchema(),
    culturalEtiquette: bilingualListSchema(),
    routeOptimization: bilingualTextSchema(),
    transportAnalysis: bilingualListSchema(),
    budgetAdvice: bilingualTextSchema()
  },
  required: [
    'plan',
    'transport',
    'accommodation',
    'dining',
    'activities',
    'itinerary',
    'costEstimate',
    'weatherForecast',
    'contingencies',
    'crowdPrediction',
    'safetyWarnings',
    'localRegulations',
    'culturalEtiquette',
    'routeOptimization',
    'transportAnalysis',
    'budgetAdvice'
  ]
}

function bilingualTextSchema() {
  return {
    type: SchemaType.OBJECT,
    properties: {
      tr: { type: SchemaType.STRING },
      en: { type: SchemaType.STRING }
    },
    required: ['tr', 'en']
  }
}

function bilingualListSchema() {
  return {
    type: SchemaType.ARRAY,
    items: bilingualTextSchema()
  }
}

export async function planTrip(input: {
  budgetRange: string
  dates: { start: string; end: string }
  destination: string
  interests: string[]
}) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY env')
  }

  const prompt = `You are TRIPVERSE AI Trip Planner. Perform deep reasoning over travel constraints (time windows, budget tiers, mobility limits), seasonal factors, and user preferences.
  Generate a comprehensive plan with:
  - Hour-by-hour itinerary with buffer time per step and optimized activity sequencing
  - Route optimization and transport analysis across modes with transfer notes
  - Precise cost estimation considering price fluctuations, local economics, and hidden expenses; include currency conversion
  - Budget advice tailored to user constraints
  - Weather forecast and contingency alternatives
  - Crowd prediction and safety warnings including local regulations
  - Cultural etiquette notes
  - Accommodation and dining across budget tiers
  - Activities matched to interests
  Output MUST be perfectly bilingual ('tr' and 'en') for each field. Keep tone cyber-blue, minimalistic.`

  const model = genAI.getGenerativeModel({
    model: MODEL_PLANNER,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: plannerSchema
    }
  })

  const user = {
    budgetRange: input.budgetRange,
    dates: input.dates,
    destination: input.destination,
    interests: input.interests
  }

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [{ text: `${prompt}\n${JSON.stringify(user)}` }] }
    ]
  })

  const text = result.response.text()
  return JSON.parse(text)
}

export async function reconstructTrip(input: { imageBase64: string }) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY env')
  }

  const prompt = `AI Trip Reconstructor: From the single photo, infer destination, season, typical budget, and generate an itinerary with transportation, stays, dining, activities, cost estimate, crowd and safety insights.
  Output bilingual fields ('tr' and 'en'). Minimalistic, cyber-blue tone.`

  const model = genAI.getGenerativeModel({
    model: MODEL_VISION,
    generationConfig: { responseMimeType: 'application/json' }
  })

  const imagePart = {
    inlineData: {
      data: input.imageBase64,
      mimeType: 'image/jpeg'
    }
  }

  const result = await model.generateContent({
    contents: [
      { role: 'user', parts: [imagePart as any, { text: prompt }] }
    ]
  })
  const text = result.response.text()
  return JSON.parse(text)
}
