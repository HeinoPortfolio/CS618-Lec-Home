import { getUserInfoById } from '../services/users.js'

// Post schema ================================================================
export const postSchema = `#graphql
    type Post{
        id: ID!
        title: String!
        author: User
        contents: String
        tags: [String!]
        createdAt: Float
        updatedAt: Float
    }
    `
// Post resolver ==============================================================
export const postResolver = {
  Post: {
    author: async (post) => {
      return await getUserInfoById(post.author)
    },
  },
}
