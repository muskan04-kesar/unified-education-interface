import Institution from "../models/institution.js";

export const createInstitution = async (req, res, next) => {
  try {
    const inst = await Institution.create(req.body);
    res.status(201).json(inst);
  } catch (err) { next(err); }
};

export const listInstitutions = async (req, res, next) => {
  try {
    const list = await Institution.find().sort({ name: 1 });
    res.json(list);
  } catch (err) { next(err); }
};

export const getInstitution = async (req, res, next) => {
  try {
    const inst = await Institution.findById(req.params.id);
    if (!inst) return res.status(404).json({ message: "Not found" });
    res.json(inst);
  } catch (err) { next(err); }
};
export const deleteInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndDelete(req.params.id);

    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    res.status(200).json({ message: "Institution deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update institution
export const updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' });
    }

    res.json(institution);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};