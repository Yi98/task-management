import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";
import Task from "../../../models/Task";
import User from "../../../models/User";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated." });
  }

  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const condition =
          req.query.pathname == "/completed"
            ? ["$completed", 1, 0]
            : ["$completed", 0, 1];

        const allCategories = await Category.find();

        let categories = await Task.aggregate([
          {
            $group: {
              _id: "$category",
              sum: {
                $sum: { $cond: condition },
              },
            },
          },
          {
            $lookup: {
              from: Category.collection.name,
              localField: "_id",
              foreignField: "_id",
              as: "category",
            },
          },
          { $project: { name: "$category.name", sum: 1 } },
          { $unwind: { path: "$name" } },
        ]);

        const exclusive = allCategories.filter(
          (elem) => !categories.find(({ _id }) => elem._id == _id.toString())
        );

        let total = 0;
        for (let i = 0; i < categories.length; i++) {
          total += categories[i].sum;
        }

        categories = [{ name: "All", sum: total }, ...categories, ...exclusive];

        res.status(200).json({ success: true, categories: categories });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        const addedCategory = await newCategory.save();

        const user = await User.findById(session.user.id);
        user.categories.push(addedCategory._id);
        await user.save();

        res.status(201).json({ success: true, category: addedCategory });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
