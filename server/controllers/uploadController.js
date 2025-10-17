import CreditReport from "../models/CreditReport.js";
import { parseCreditXML } from "../utils/xmlParser.js";

export const uploadXML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.file.originalname.toLowerCase().endsWith(".xml")) {
      return res
        .status(400)
        .json({ message: "Invalid file format. Upload XML only." });
    }

    const xmlData = req.file.buffer.toString("utf-8");

    const parsed = await parseCreditXML(xmlData);

    const report = await CreditReport.create(parsed);

    res.status(201).json(report);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error while uploading file" });
  }
};
