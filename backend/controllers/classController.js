import ClassModel from "../models/class.js";

export const createClass = async (req, res, next) => {
  try {
    const c = await ClassModel.create(req.body);
    res.status(201).json(c);

  } catch (err) {
    next(err);
  }
};

export const listClasses = async (req, res, next) => {
  try {
    const list = await ClassModel.find()
      .populate("classTeacherId", "userId")
      .sort({ className: 1 });

    res.json(list);

  } catch (err) {
    next(err);
  }
};
