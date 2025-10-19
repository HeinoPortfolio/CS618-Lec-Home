import { gql } from '@apollo/client/core/index.js'

// Fragment for a post ========================================================
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    contents
    updatedAt
    createdAt
    author {
      username
    }
  }
`
// Get posts query graphql=====================================================
export const GET_POSTS = gql`
  ${POST_FIELDS}
  query getPosts($options: PostsOptions) {
    posts(options: $options) {
      ...PostFields
    }
  }
`
// Get post by author query graphql ===========================================
export const GET_POSTS_BY_AUTHOR = gql`
  ${POST_FIELDS}
  query getPostsByAuthor($author: String!, $options: PostsOptions) {
    postsByAuthor(username: $author, options: $options) {
      ...PostFields
    }
  }
`

// Create a post query using grphql ===========================================
export const CREATE_POST = gql`
  mutation createPost($title: String!, $contents: String, $tags: [String!]) {
    createPost(title: $title, contents: $contents, tags: $tags) {
      id
      title
    }
  }
`
