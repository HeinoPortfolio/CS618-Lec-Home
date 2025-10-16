import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import { Post } from '../components/Post.jsx'
import { getPostById } from '../api/posts.js'

// Function to view an individual post ========================================
export function ViewPost({ postId }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })

  const post = postQuery.data

  // Page for viewing the singel post ========================================
  return (
    <div style={{ padding: 10 }}>
      <Header />
      <br />
      <hr />
      <Link to='/'> Back to Main Page </Link>
      <br />
      <hr />
      <pre>
        {post ? (
          <Post {...post} fullPost />
        ) : (
          `Post with id${postId} not found!`
        )}
      </pre>
    </div>
  )
}

ViewPost.propTypes = {
  postId: PropTypes.string.isRequired,
}
