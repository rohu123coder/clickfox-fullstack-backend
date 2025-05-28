const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("❌ Missing essential environment variables!");
  process.exit(1);
}

const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Click Fox API is running 🚀");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
