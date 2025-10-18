import { listPostsByAuthor } from '../services/posts.js'

// User type ==================================================================
export const userSchema = `#graphql
    type User{
        username: String!
        posts: [Post!]!

    }
    `

// User resolver ===============================================================
export const userResolver = {
  User: {
    posts: async (user) => {
      return await listPostsByAuthor(user.username)
    },
  },
}
