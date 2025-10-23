import { useState, useEffect } from 'react'
import { useSocket } from '../contexts/SocketIOContext.jsx'

export function useChat() {
  const { socket } = useSocket()
  const [messages, setMessages] = useState([])

  function receiveMessage(message) {
    setMessages((messages) => [...messages, message])
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
          setMessages([])
          break
        case 'rooms': {
          const userInfo = await socket.emitWithAck('user.info', socket.id)
          const rooms = userInfo.rooms.filter((room) => room !== socket.id)
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
      // Show themessage
      socket.emit('chat.message', message)
    }
  }
  return { messages, sendMessage }
}
