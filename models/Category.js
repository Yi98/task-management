import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this category."],
  },
});

export default mongoose.model("Category", CategorySchema);
