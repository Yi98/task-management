import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, tasks: tasks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { title, date } = req.body;
        const newTask = new Task({ title, dueDate: date });
        const addedTask = await newTask.save();

        res.status(201).json({ success: true, task: addedTask });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
