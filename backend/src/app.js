import express from 'express'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

// New import
import { handleSocket } from './socket.js'

// Instatiate the application =================================================
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Application Routes =========================================================
userRoutes(app)

// The Socket IO code begins here =============================================
// Create a socket.io server ==================================================
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

// Handle the socket ==========================================================
handleSocket(io)

// The root or default route ==================================================
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// export { app }
export { server as app }
