import { Request, Response } from 'express'
import db from '../database/db'

export const getInfluencerData = (req: Request, res: Response): void => {
  const sql = 'SELECT * FROM InfluencerData'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
}
