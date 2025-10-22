// Setup a connection event  ==================================================
// socket handler===
export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    // Room addition ===========================================================
    // Will receive the room the user wants to be in ===========================
    // Default will be a public room ===========================================
    const room = socket.handshake.query?.room ?? 'public'

    // Join the room =====
    socket.join(room)
    // Message to show that the user joined a room =============
    console.log(socket.id, 'Joined room:', room)

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
    socket.on('chat.message', (message) => {
      console.log(`Message from: ${socket.id}: ${message}`) /
        // Produce a message event =============================
        // Broadcast to everyone including the sender of the message ===============
        // Will be broadcasting to the room only ====================================
        io.to(room).emit('chat.message', { username: socket.id, message })

      // Broadcast to everyone but the sender ===================
      //socket.broadcast.emit('chat.message', { username: socket.id, message })
    })
    socket.on('user.info', async (socketId, callback) => {
      const sockets = await io.in(socketId).fetchSockets()

      if (sockets.length === 0) return callback(null)
      const socket = sockets[0]
      const userInfo = {
        socketId,
        rooms: Array.from(socket.rooms),
      }
      return callback(userInfo)
    })
  })
}
