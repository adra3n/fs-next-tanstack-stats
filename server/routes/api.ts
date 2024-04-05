import express, { Router } from 'express'
import { getInfluencerData } from '../controllers/contentController'

const router: Router = express.Router()

router.get('/influencer-data', getInfluencerData)

export default router
