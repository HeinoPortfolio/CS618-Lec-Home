import {
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
} from '../services/posts.js'

// An entry point for all the queries ===========================
export const querySchema = `#graphql 
    input PostsOptions{
      sortBy: String
      sortOrder: String
    }

    type Query{
    test: String
    posts(options: PostsOptions): [Post]!
    postsByAuthor(username: String!, options: PostsOptions) : [Post!]!
    postsByTag(tag: String!, options: PostsOptions): [Post!] !
    postById(id: ID!): Post
    }
    `

// Query resolver ==============================================
export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello Wolrd from GraphQL! Just checking again!'
    },
    posts: async (parent, { options }) => {
      return await listAllPosts(options)
    },
    postsByAuthor: async (parent, { username, options }) => {
      return await listPostsByAuthor(username, options)
    },
    postsByTag: async (parent, { tag, options }) => {
      return await listPostsByTag(tag, options)
    },
    postById: async (parent, { id }) => {
      return await getPostById(id)
    },
  },
}
