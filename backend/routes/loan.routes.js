import express from "express";
import { getOngoingLoans } from "../controllers/loan.controller.js";

const router = express.Router();
router.get("/", getOngoingLoans);

export default router;
