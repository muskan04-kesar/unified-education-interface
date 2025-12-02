import ClassModel from "../models/class.js";

export const getClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find({});
    res.json(classes);
  } catch (err) {
    console.error("Error loading classes:", err);
    res.status(500).json({ message: "Error loading classes" });
  }
};
