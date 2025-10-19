import { gql } from '@apollo/client/core/index.js'

// Get posts query graphql=====================================================
export const GET_POSTS = gql`
  query getPosts($options: PostsOptions) {
    posts(options: $options) {
      id
      title
      contents
      tags
      updatedAt
      createdAt
      author {
        username
      }
    }
  }
`
