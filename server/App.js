import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://financial-credit-report.vercel.app", // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDB();
app.use("/upload", uploadRoutes);
app.use("/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
