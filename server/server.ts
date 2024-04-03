import express, { Request, Response, NextFunction } from 'express'
import influencerData from './mock-data'

const app = express()

//cors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// get /api/influencer-data
app.get('/api/influencer-data', (req: Request, res: Response) => {
  res.json(influencerData)
})

//port
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
