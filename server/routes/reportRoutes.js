import express from "express";
import {
  getAllReports,
  getReportById,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getAllReports);
router.get("/:id", getReportById);

export default router;
