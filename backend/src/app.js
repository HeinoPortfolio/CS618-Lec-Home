import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { eventRoutes } from './routes/event.js'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql/index.js'

// Create a NEw Apollo server =================================================
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

// Instatiate the application =================================================
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Start the Apollo server ===================================================
apolloServer
  .start()
  .then(() => app.use('/graphql', expressMiddleware(apolloServer)))

// Application Routes =========================================================
postsRoutes(app)
userRoutes(app)
eventRoutes(app)

// The root or default route ==================================================
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }
