import express from "express";
import { login , register , updateUser,deleteUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
// Execute Register Data
router.post("/register", register);
router.put('/users/:_id', updateUser);
router.delete('/users/:_id', deleteUser);

export default router;
