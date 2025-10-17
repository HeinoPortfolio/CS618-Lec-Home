// Model for user events ======================================================
import mongoose, { Schema } from 'mongoose'

// Model to keep data about the events =======================================
// Session is a unique ID  for a single session ==
// Keep track of any action that user does ===
const eventsSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    session: { type: String, required: true },
    action: { type: String, required: true },
    date: { type: Date, required: true },
  },
  // Include the timestamp that is found in mongoose =====
  { timestamps: true },
)
export const Event = mongoose.model('events', eventsSchema)
