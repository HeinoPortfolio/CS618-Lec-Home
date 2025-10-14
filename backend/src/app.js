import express from 'express'

//import cors from 'cors'
//import bodyParser from 'body-parser'
//import { postsRoutes } from './routes/posts.js'

// Instatiate the application =================================================
const app = express()
//app.use(cors())
//app.use(bodyParser.json())

//postsRoutes(app)

// The root or default route ==================================================
app.get('/', (req, res) => {
  res.send('Hello from Express! Using Nodemon!')
})

export { app }
