import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

// Imports for the socket.io module ===========================================
import { io } from 'socket.io-client'

// Create a socket ============================================================
const socket = io(import.meta.env.VITE_SOCKET_HOST)

// Client to call the backenend services ======================================
const queryClient = new QueryClient()

//  Create the browser routes =================================================
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

// Event handlers =============================================================
socket.on('connect', () => {
  console.log('connected to socket.io as', socket.id)
  // send a messsage to the server about the connection =======
  //socket.emit('chat.message', 'Hello from the client!')

  // Get message from the parameters ==================================
  socket.emit(
    'chat.message',
    new URLSearchParams(window.location.search).get('mymsg'),
  )
})
socket.on('connect_error', (err) => {
  console.error('socket.io connect error:', err)
})
socket.on('chat.message', (msg) => {
  console.log(`${msg.username}: ${msg.message}`)
})

// Create the application =====================================================
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
