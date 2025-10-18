// An entry point for all the queries ===========================
export const querySchema = `#graphql 
    type Query{
    test: String  
    }
    `

// Query resolver ==============================================
export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello Wolrd from GraphQL! Just checking again!'
    },
  },
}
