import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { getPosts } from '../api/posts.js'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Header } from '../components/Header.jsx'

import { Helmet } from 'react-helmet-async'

// Create main page ===========================================================
export function Blog() {
  // States of the Blog ======================
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // Create a useQuery instance ==============
  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  // Extract the data to be used ==============================================
  const posts = postsQuery.data ?? []

  // Form to display the application components ===============================
  return (
    <div style={{ padding: 10 }}>
      <Helmet>
        <title>Full-Stack React Blog</title>
        <meta
          name='description'
          content='A blog full of articles about anything React development.'
        />
      </Helmet>
      <Header />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <br />
      <br />
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
/*
Blog.propTypes = {
  initialData: PropTypes.shape(PostList.propTypes.posts),
}
  */
