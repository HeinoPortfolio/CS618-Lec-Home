import jwt from 'jsonwebtoken'
import { getUserInfoById } from './services/users.js'

import { createMessage, getMessagesByRoom } from './services/messages.js'

// Setup a connection event  ==================================================
// socket handler===
export function handleSocket(io) {
  // Function to handle authentication ========================================
  io.use((socket, next) => {
    if (!socket.handshake.auth?.token) {
      return next(new Error('Authentication failed: no token provided'))
    }
    jwt.verify(
      socket.handshake.auth.token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return next(new Error('Authentication failed: invalid token'))
        }
        socket.auth = decodedToken
        // socket will have a username
        socket.user = await getUserInfoById(socket.auth.sub)
        return next()
      },
    )
  }) // End Authentication ====

  // Function to handle the connection ==========================================
  io.on('connection', async (socket) => {
    console.log('User connected:', socket.id)

    // Room addition ===========================================================
    // Will receive the room the user wants to be in ===========================
    // Default will be a public room ===========================================
    const room = socket.handshake.query?.room ?? 'public'

    // Join the room =====
    socket.join(room)
    // Message to show that the user joined a room =============
    console.log(socket.id, 'Joined room:', room)

    // New =====
    // Get the messages from the database ======================
    const messages = await getMessagesByRoom(room)

    // For each message broadcast them =====
    messages.forEach(({ username, message }) =>
      socket.emit('chat.message', { username, message, replayed: true }),
    )

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
    socket.on('chat.message', (message) => {
      console.log(`Message from: ${socket.id}: ${message}`) /
        // Produce a message event =============================
        // Broadcast to everyone including the sender of the message ==========
        // Will be broadcasting to the room only ==============================

        io.to(room).emit('chat.message', {
          username: socket.user.username,
          message,
        })
      createMessage({ username: socket.user.username, message, room })
      // Broadcast to everyone but the sender ===================
      // DO NOT REMOVE the statement below ======================
      //socket.broadcast.emit('chat.message', { username: socket.id, message })
    })

    socket.on('user.info', async (socketId, callback) => {
      const sockets = await io.in(socketId).fetchSockets()

      if (sockets.length === 0) return callback(null)
      const socket = sockets[0]
      const userInfo = {
        socketId,
        rooms: Array.from(socket.rooms),
        user: socket.user,
      }
      return callback(userInfo)
    })
  })
}
