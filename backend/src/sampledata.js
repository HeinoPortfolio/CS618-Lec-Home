import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'
import dotenv from 'dotenv'

dotenv.config()
await initDatabase()

const post = new Post({
  title: 'Hello Mongoose!',
  author: 'Huseyin Ergin',
  contents: 'This post is stored in a MongoDB database using Mongoose',
  tags: ['mongoose', 'mongodb'],
})

await post.save()

const post2 = new Post({
  title: 'Till Tomorrow!',
  author: 'Vera Lynn',
  contents: 'Until we meet again some sunnyday.',
  tags: ['sunny', 'tommorrow'],
})

await post2.save()

const post3 = new Post({
  title: 'Hello everyone!',
  author: 'Steve Jones',
  contents: 'Happy to be here. Just waiting for veryone to arrive@ ',
  tags: ['waiting', 'arrive'],
})
await post3.save()

const post4 = new Post({
  title: 'Parting is sweet sorrow!',
  author: 'Rick Jones',
  contents: 'We will be  back again soon!',
  tags: ['sorrow', 'again'],
})

await post4.save()

const posts = await Post.find()

console.log(posts)
