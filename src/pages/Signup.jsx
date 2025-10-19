import { useState } from 'react'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { useNavigate, Link } from 'react-router-dom'

import { SIGNUP_USER } from '../api/graphql/users.js'

export function Signup() {
  // States for the signup page ===============================================
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  // Mutation for handling the signup action using GraphQL ====================
  const [signupUser, { loading }] = useGraphQLMutation(SIGNUP_USER, {
    variables: { username, password },
    onCompleted: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })

  // Handle the submit event ==================================================
  const handleSubmit = (e) => {
    e.preventDefault()
    signupUser()
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
        value={loading ? 'Signing up...' : 'Sign Up Here'}
        disabled={!username || !password || loading}
      />
    </form>
  )
}
