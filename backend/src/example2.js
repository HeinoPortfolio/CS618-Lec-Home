import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

// Initialize the database ====================================================
await initDatabase()

const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Matthew Heino',
  contents: 'This post is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

await post.save()

const posts = await Post.find()
console.log(posts)
