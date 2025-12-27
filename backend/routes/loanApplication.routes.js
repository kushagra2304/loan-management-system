import express from "express";
import { createLoanApplication, getLoanApplications } from "../controllers/loanApplication.controller.js";

const router = express.Router();

router.post("/", createLoanApplication);
router.get("/", getLoanApplications);

export default router;
