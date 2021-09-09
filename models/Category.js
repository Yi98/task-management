import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this category."],
  },
  hexColor: { type: String, default: "#5F69EF" },
});

CategorySchema.plugin(timestamps);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
