import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './user.jsx'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)
    return (
      <div>
        <h1> Welcome To My Blog</h1>
        Logged in as: &nbsp; &nbsp;
        <b>
          <User id={sub} />
        </b>
        <br />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
        <br />
        <br />
      </div>
    )
  }
  // Header information to be displayed========================================
  return (
    <div>
      <h1> Welcome To The Blog! </h1>
      <Link to='/login'>Log In</Link> | <Link to='signup'>Sign Up</Link>
      <br />
      <br />
      <hr />
    </div>
  )
}
