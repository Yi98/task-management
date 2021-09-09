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
        const isCompleted = req.query.pathname == "/completed" ? true : false;

        const user = (
          await User.findById(session.user.id)
            .populate("categories")
            .populate("tasks")
        ).toObject();

        let categories = user.categories;

        let total = 0;
        const categoryCount = user.tasks
          .filter((task) => task.completed == isCompleted)
          .reduce((obj, current) => {
            total += 1;
            obj[current.category] = (obj[current.category] || 0) + 1;
            return obj;
          }, {});

        for (let i = 0; i < categories.length; i++) {
          for (let [key, value] of Object.entries(categoryCount)) {
            if (categories[i]._id.toString() == key) {
              categories[i].sum = value;
              break;
            }
          }
        }

        categories = [{ name: "All", sum: total }, ...categories];

        res.status(200).json({ success: true, categories });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { name, hexColor } = req.body;
        const newCategory = new Category({ name, hexColor });

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
