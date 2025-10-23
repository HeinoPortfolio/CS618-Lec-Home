import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function useChat() {
  const { socket } = useSocket()
  const [messages, setMessages] = useState([])

  function receiveMessage(message) {
    setMessages((messages) => [...messages, message])
  }

  // Clear the messages =====
  function clearMessages() {
    setMessages([])
  }

  // Get rooms ======
  async function getRooms() {
    const userInfo = await socket.emitWithAck('user.info', socket.id)
    const rooms = userInfo.rooms.filter((room) => room !== socket.id)
    return rooms
  }

  useEffect(() => {
    socket.on('chat.message', receiveMessage)
    return () => socket.off('chat.message', receiveMessage)
  }, [])

  async function sendMessage(message) {
    if (message.startsWith('/')) {
      // Get the command part of the string =====
      const command = message.substring(1)

      switch (command) {
        case 'clear':
          // Reset the array of messages ====
          clearMessages()
          break
        case 'rooms': {
          const rooms = await getRooms()
          receiveMessage({
            message: `You are in: ${rooms.join(', ')}`,
          })
          break
        }
        default:
          receiveMessage({
            message: `Unknown command: ${command}`,
          })
          break
      }
    } else {
      // Show the message
      socket.emit('chat.message', 'public', message)
    }
  }
  return { messages, sendMessage }
}
