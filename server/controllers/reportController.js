import CreditReport from "../models/CreditReport.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await CreditReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await CreditReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching report" });
  }
};
