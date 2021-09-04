import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import User from "../../../models/User";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated." });
    return;
  }

  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { title, dueDate, category } = req.body;
        const newTask = new Task({ title, dueDate, category });
        const addedTask = await newTask.save();

        await Task.populate(addedTask, { path: "category" });

        const user = await User.findById(session.user.id);
        user.tasks.push(addedTask._id);
        await user.save();

        res.status(201).json({ success: true, task: addedTask });
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
