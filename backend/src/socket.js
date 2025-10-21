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
    })
  })
}
