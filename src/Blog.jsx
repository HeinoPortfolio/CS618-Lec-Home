//import { Post } from './components/Post.jsx'
import { PostList } from './components/PostList.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'

const posts = [
  { title: 'full', contents: 'somestuff', author: 'me' },
  { title: 'sometitle else   weeee' },
]

// Create main page ===========================================================
export function Blog() {
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
