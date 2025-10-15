import mongoose, { Schema } from 'mongoose'

// Model for the post =========================================================
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    //author: String,
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
  },
  { timestamps: true },
)

export const Post = mongoose.model('post', postSchema)
