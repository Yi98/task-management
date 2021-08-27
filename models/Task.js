import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this task."],
  },
  dueDate: {
    type: String,
    required: [true, "Please provide the due date for this task"],
  },
  completed: { type: Boolean, default: false },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
