import express from "express";
import { createPartnerLoan } from "../controllers/partner.controller.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.post("/loan-applications", apiKeyAuth, createPartnerLoan);

export default router;
