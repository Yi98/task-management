import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find({}).populate("category");
        res.status(200).json({ success: true, tasks: tasks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { title, dueDate, category } = req.body;
        const newTask = new Task({ title, dueDate, category });
        const addedTask = await newTask.save();

        await Task.populate(addedTask, { path: "category" });

        res.status(201).json({ success: true, task: addedTask });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        const newData = { completed: true };
        const options = {
          new: true, // returns updated document instead of old document
          useFindAndModify: false,
        };

        const updatedTask = await Task.findByIdAndUpdate(
          req.body.id,
          newData,
          options
        );

        if (!updatedTask) {
          return res.status(400).json({
            success: false,
            message: "Task not found",
          });
        }

        res.status(201).json({
          success: true,
          task: updatedTask,
          message: "Task moved to completed",
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        console.log(req.params);
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
          return res
            .status(404)
            .json({ success: false, message: `Task not found` });
        }

        return res.status(200).json({
          success: true,
          message: "Task deleted succesfully.",
          deletedTask,
        });
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
