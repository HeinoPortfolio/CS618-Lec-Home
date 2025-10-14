import dotenv from 'dotenv'
dotenv.config()

import { app } from './app.js'
import { initDatabase } from './db/init.js'

const PORT = process.env.PORT

// Initialize the database ====================================================
await initDatabase()

app.listen(PORT)

console.info(`Express server running on http://localhost:${PORT}`)
