import Institution from "../models/institution.js";

export const createInstitution = async (req, res, next) => {
  try {
    const inst = await Institution.create(req.body);
    res.status(201).json(inst);

  } catch (err) {
    next(err);
  }
};

export const listInstitutions = async (req, res, next) => {
  try {
    const list = await Institution.find().sort({ name: 1 });
    res.json(list);

  } catch (err) {
    next(err);
  }
};

export const getInstitution = async (req, res, next) => {
  try {
    const inst = await Institution.findById(req.params.id);
    if (!inst) return res.status(404).json({ message: "Not found" });

    res.json(inst);

  } catch (err) {
    next(err);
  }
};

export const updateInstitution = async (req, res) => {
  try {
    const inst = await Institution.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );

    if (!inst) return res.status(404).json({ message: "Institution not found" });

    res.json(inst);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteInstitution = async (req, res) => {
  try {
    const inst = await Institution.findByIdAndDelete(req.params.id);
    if (!inst) return res.status(404).json({ message: "Institution not found" });

    res.json({ message: "Institution deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
