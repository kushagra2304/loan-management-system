import express from "express";
import {
  getCollaterals,
  createCollateral,
} from "../controllers/collateral.controller.js";

const router = express.Router();

router.get("/", getCollaterals);
router.post("/", createCollateral);

export default router;
