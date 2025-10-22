import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'
import { Chat } from './pages/Chat.jsx'

// Client to call the backenend services ======================================
const queryClient = new QueryClient()

//  Create the browser routes =================================================
const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
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

// Create the application =====================================================
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketIOContextProvider>
          <RouterProvider router={router} />
        </SocketIOContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
