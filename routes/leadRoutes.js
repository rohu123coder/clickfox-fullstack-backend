const express = require("express");
const router = express.Router();
const Lead = require("../models/lead");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// ✅ Create Lead
router.post("/", verifyToken, async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ message: "Lead created successfully", lead });
  } catch (err) {
    res.status(500).json({ error: "Failed to create lead" });
  }
});

// ✅ Get All Leads
router.get("/", verifyToken, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

module.exports = router;
