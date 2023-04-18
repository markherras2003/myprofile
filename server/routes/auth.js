import express from "express";
import { login , register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// Execute Register Data
router.post("/auth/register", register);

export default router;
