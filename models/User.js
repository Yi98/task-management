import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email."],
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);