import { gql } from '@apollo/client/core/index.js'

// Get posts query graphql=====================================================
export const GET_POSTS = gql`
  query getPosts {
    posts {
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
