import express from 'express'
import { postsRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'

// Instatiate the application =================================================
const app = express()
app.use(cors())
app.use(bodyParser.json())
postsRoutes(app)

// The root or default route ==================================================
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }
