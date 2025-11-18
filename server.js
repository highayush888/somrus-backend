import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ---------------- APP STATUS ----------------
let appStatus = "online"; // default status

// ---------------- ROUTES ----------------

// ✔ Check app status (used by mobile app)
app.get("/status", (req, res) => {
  res.json({ appStatus });
});

// ✔ Update app status (used by admin panel)
app.post("/admin/update", (req, res) => {
  const { status } = req.body;

  if (status !== "online" && status !== "offline") {
    return res.status(400).json({ message: "Invalid status value." });
  }

  appStatus = status;
  console.log("🔄 App status updated to:", status);

  res.json({ success: true, appStatus });
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
