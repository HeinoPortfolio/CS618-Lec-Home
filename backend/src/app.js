import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'

// New ipmorts for socket.io module =========
import { createServer } from 'node:http'
import { Server } from 'socket.io'

// Instatiate the application =================================================
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Application Routes =========================================================
postsRoutes(app)
userRoutes(app)

// The Socket IO code begins here =============================================
// Create a socket.io server ==================================================
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

// Setup a connection event  ==================================================
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})
// End socket addition ====

// The root or default route ==================================================
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// export { app }
export { server as app }
