# API Endpoints

POST /api/plan
- body: { budgetRange, dates: {start,end}, destination, interests[] }
- resp: planner object with bilingual fields

POST /api/reconstruct
- body: { imageBase64 }
- resp: reconstructed planner object

POST /api/stripe/create-subscription
- body: { customerId, priceId }
- resp: { id, status }

POST /api/stripe/webhook
- Stripe webhook receiver

