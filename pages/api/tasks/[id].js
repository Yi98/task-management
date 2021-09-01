import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ success: false, message: "Not authenticated." });
    return;
  }

  const { method, query } = req;
  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        const newData = req.body;
        const options = {
          new: true, // returns updated document instead of old document
          useFindAndModify: false,
        };

        const updatedTask = await Task.findByIdAndUpdate(
          query.id,
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
          message: "Task updated.",
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(query.id);

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
