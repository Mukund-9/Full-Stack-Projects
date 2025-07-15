import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessagesSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String },
    createdAt: {
    type: Date,
    default: Date.now,
  },
    });

 
export default mongoose.models.Messages || model("Messages", MessagesSchema);