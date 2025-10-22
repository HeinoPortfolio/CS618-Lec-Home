// Setup a connection event  ==================================================
// socket handler===
export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
    socket.on('chat.message', (message) => {
      console.log(`Message from: ${socket.id}: ${message}`) /
        // Produce a message evnt =============================
        // Broadcast to everyone including the sender of the message ===============
        io.emit('chat.message', { username: socket.id, message })

      // Broadcast to everyone but the sender ===================
      //socket.broadcast.emit('chat.message', { username: socket.id, message })
    })
  })
}
