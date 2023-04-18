import express from "express";
import { login , register , updateUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// Execute Register Data
router.post("/register", register);
router.put('/users/:_id', updateUser);

export default router;
