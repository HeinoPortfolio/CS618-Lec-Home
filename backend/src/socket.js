// Setup a connection event  ==================================================
// socket handler===
export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
    // Attach a "chat.message" handler ========
    socket.on('chat.message', (message) => {
      console.log(`${socket.id}: ${message}`)
      // Produce a broadcast message event =============
      // *** In chat message we want everyone to receive the message ***** ====
      io.emit('chat.message', { username: socket.id, message })

      // To keep the original sender from receiving the message ====
      //socket.broadcast.emit('chat.message', { username: socket.id, message })************************
    })
  })
}
