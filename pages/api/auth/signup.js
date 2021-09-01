import { hashPassword } from "../../../lib/auth";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
          email,
          password: hashedPassword,
        });

        const addedUser = await newUser.save();

        res.status(201).json({ success: true, data: addedUser });
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
