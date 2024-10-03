import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  feedback: {
    type: [String],
    default: [],
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
