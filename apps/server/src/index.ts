import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router as apiRouter } from './routes/api.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'tripverse-server' })
})

app.use('/api', apiRouter)

const port = 4000
app.listen(port, () => {
  console.log(`TRIPVERSE server running on http://localhost:${port}`)
})
