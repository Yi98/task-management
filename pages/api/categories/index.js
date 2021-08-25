import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        const addedCategory = await newCategory.save();

        res.status(201).json({ success: true, data: addedCategory });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
