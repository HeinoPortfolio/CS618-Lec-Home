import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

// Login page =================================================================
export function Login() {
  // States of the login page =================================================
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const [, setToken] = useAuth()

  // Mutation function ========================================================
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/') // Navigate to the main page =====
    },
    onError: () => alert('Failed to login!'),
  })

  // Function to handle information submission ================================
  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  // Form to create login page ================================================
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Here</h1>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <div>
        <label htmlFor='create-username'>Username: </label>
        <input
          type='text'
          name='create-username'
          id='create-username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-password'>Password: </label>
        <input
          type='password'
          name='create-password'
          id='create-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <input
        type='submit'
        value={loginMutation.isPending ? 'Logging in...' : 'Log In Here'}
        disabled={!username || !password || loginMutation.isPending}
      />
    </form>
  )
}
