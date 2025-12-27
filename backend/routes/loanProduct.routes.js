import express from "express";
import { createLoanProduct, getLoanProducts } from "../controllers/loanProduct.controller.js";

const router = express.Router();

router.post("/", createLoanProduct);
router.get("/", getLoanProducts);

export default router;
