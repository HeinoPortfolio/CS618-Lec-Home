import mongoose, { Schema } from 'mongoose'

// The user model that will model user login information ======================
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export const User = mongoose.model('user', userSchema)
