import sqlite3 from 'sqlite3'
import path from 'path'

const db = new sqlite3.Database(path.resolve(__dirname, 'db.sqlite'))

export default db
