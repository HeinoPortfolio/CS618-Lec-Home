import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  //Create tjhe query client =======================
  const queryClient = useQueryClient()

  // Create the post mutation ==================
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  // External function to handle the action of the form being submitted=======
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

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
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={
          createPostMutation.isPending
            ? 'Creating Post...'
            : 'Click to Create Post'
        }
        disabled={!title}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          The post was created successfully!
        </>
      ) : (
        <>
          <br />
          Post was not created!!!
        </>
      )}
    </form>
  )
}
