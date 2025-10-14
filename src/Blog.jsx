// import { Post } from './components/Post.jsx'
import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'

import { getPosts } from './api/posts.js'
import { useQuery } from '@tanstack/react-query'

/*
const posts = [
  { title: 'full', contents: 'somestuff', author: 'me' },
  { title: 'sometitle else   weeee' },
]
*/

// Create main page ===========================================================
export function Blog() {
  // Create a useQuery instance ==============
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  // Extract the data to be used ==============================================
  const posts = postsQuery.data ?? []

  // Form to display the application components ================================
  return (
    <div style={{ padding: 10 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <br />
      <br />
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}

// export default App
