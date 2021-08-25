import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this task."],
  },
  date: {
    type: String,
    required: [true, "Please provide the date for this task"],
  },
});

export default mongoose.model("Task", TaskSchema);
