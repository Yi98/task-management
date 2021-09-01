import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email."],
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: [],
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: [],
    },
  ],
});

UserSchema.plugin(timestamps);

export default mongoose.models.User || mongoose.model("User", UserSchema);
