import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'

import { Link } from 'react-router-dom'
import slug from 'slug'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  // Get the token ===========================
  const [token] = useAuth()

  // Create the post mutation =================================================
  const [createPost, { loading, data }] = useGraphQLMutation(CREATE_POST, {
    variables: { title, contents },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
  })

  // External function to handle the action of the form being submitted=======
  const handleSubmit = (e) => {
    e.preventDefault()
    createPost()
  }

  // If there is NO TOKEN do not show the rest of the form ====================
  if (!token) return <div>Please log in to create a new post.</div>

  // Form for creating the new post ===========================================
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'> Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={loading ? 'Creating Post...' : 'Click to Create Post'}
        disabled={!title || loading}
      />
      {data?.createPost ? (
        <>
          <br />
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{' '}
          The post was created successfully!
        </>
      ) : null}
    </form>
  )
}
