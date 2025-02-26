import User from "../Database/Models/users.js";
import Feedback from "../Database/Models/feedback.js";

export const updateUserProfile = async (req, res) => {
    try {
      const updatedFields = req.body;
      await User.findOneAndUpdate({ userId: req.user.userId }, updatedFields);
      return res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
};

export const userFeedback = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { feedback } = req.body;
      let user = await Feedback.findOne({ userId });
      if (!user) {
        user = new Feedback({
          userId,
          feedback: [feedback],
        });
      } else {
        user.feedback.push(feedback);
      }
      await user.save();
      res.status(200).json({ message: "Feedback added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
};