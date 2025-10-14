import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'

// Client to call the backenend services ======================================
const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  )
}
