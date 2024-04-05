import sqlite3 from 'sqlite3'
import db from './db'
import influencerData from '../data'

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS InfluencerData (
    influencer TEXT,
    year INTEGER,
    type TEXT,
    reach_rate INTEGER
  )`)

  const stmt = db.prepare(`INSERT INTO InfluencerData VALUES (?, ?, ?, ?)`)
  for (let data of influencerData) {
    stmt.run(data.influencer, data.year, data.type, data.reach_rate)
  }
  stmt.finalize()
})

db.close()
