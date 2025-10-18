import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'

import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users.js'

export function Header() {
  const [token, setToken] = useAuth()

  const { sub } = token ? jwtDecode(token) : {}

  const userInfoQuery = useQuery({
    queryKey: ['users', sub],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  })

  const userInfo = userInfoQuery.data

  if (token) {
    return (
      <div>
        <h1> Welcome To My Blog</h1>
        Logged in as: &nbsp; &nbsp;
        <b>
          <User {...userInfo} />
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
