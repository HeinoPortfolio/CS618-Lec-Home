import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { signup } from '../api/users.js'

export function Signup() {
  // States for the signup page ===============================================
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  // Mutation for handling the signup action ==================================
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('Failed to sign up!'),
  })

  // Handle the submit event ==================================================
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }

  // Form for the signup page ==================================================
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup Here</h1>
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
        value={signupMutation.isPending ? 'Signing up...' : 'Sign Up Here'}
        disabled={!username || !password || signupMutation.isPending}
      />
    </form>
  )
}
