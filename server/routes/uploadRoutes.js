import express from "express";
import multer from "multer";
import { uploadXML } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), uploadXML);

export default router;
