import express from "express";
const router = express.Router();

import { login, register, dashboard, getAllUsers } from "../controllers/user.js"; // Make sure to add .js
import authMiddleware from '../middleware/auth.js'; 

// Route for user login
router.post("/login", async (req, res) => {
  try {
    const response = await login(req, res);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    const response = await register(req, res);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for getting the dashboard, protected by auth middleware
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const response = await dashboard(req, res);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for getting all users
router.get("/users", async (req, res) => {
  try {
    const response = await getAllUsers(req, res);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router; // Change to export default
