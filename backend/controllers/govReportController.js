import GovReport from "../models/govreport.js";

export const createReport = async (req, res, next) => {
  try {
    const r = await GovReport.create(req.body);
    res.status(201).json(r);
  } catch (err) { next(err); }
};

export const listReports = async (req, res, next) => {
  try {
    const reports = await GovReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) { next(err); }
};
