const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware"); // external middleware

// Protected dashboard route
router.get("/", authenticateToken, (req, res) => {
  res.json({
    message: "✅ Welcome to your dashboard!",
    user: req.user // You can now use req.user.userId, etc.
  });
});

module.exports = router;
