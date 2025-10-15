import { Post } from '../db/models/post.js'
import { User } from '../db/models/users.js'

// Create a post service  =====================================================
export async function createPost(userId, { title, contents, tags }) {
  const post = new Post({ title, author: userId, contents, tags })
  return await post.save()
}

// List posts =================================================================
// Funtion to get all posts ===================================================
async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

// List all posts =============================================================
export async function listAllPosts(options) {
  return await listPosts({}, options)
}

// List posts by an author ====================================================
export async function listPostsByAuthor(authorUsername, options) {
  // return await listPosts({ author }, options)

  const user = await User.findOne({ username: authorUsername })

  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

// List all posts by tags =====================================================
export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

// List post by ID ============================================================
export async function getPostById(postId) {
  return await Post.findById(postId)
}

// Update a post with a given ID ==============================================
export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

// Delete a post by an ID =====================================================
export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}
