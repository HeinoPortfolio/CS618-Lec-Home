// import { Post } from './components/Post.jsx'
import { PostList } from './components/PostList.jsx'

const posts = [
  {
    title: 'Some texthhhhhhhhhhhhhhhhhhhhhhhh',
    contents: 'some content',
    author: 'me myself and I',
  },
  {
    title: 'Some other text',
    contents: 'some other content',
    author: 'just me',
  },
]

export function App() {
  return <PostList posts={posts} />
}

// export default App
