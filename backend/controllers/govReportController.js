import GovReport from "../models/govreport.js";

export const createReport = async (req, res, next) => {
  try {
    const report = await GovReport.create({
      ...req.body,
      nirfMetrics: req.body.nirfMetrics || {},
      infraMetrics: req.body.infraMetrics || {},
      aparSummary: req.body.aparSummary || {},
      aiInsights: req.body.aiInsights || ""
    });

    res.status(201).json(report);

  } catch (err) {
    next(err);
  }
};

export const listReports = async (req, res, next) => {
  try {
    const reports = await GovReport.find().sort({ createdAt: -1 });
    res.json(reports);

  } catch (err) {
    next(err);
  }
};
