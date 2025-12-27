import express from "express";
import cors from "cors";

import loanProductRoutes from "./routes/loanProduct.routes.js";
import loanApplicationRoutes from "./routes/loanApplication.routes.js";
import partnerRoutes from "./routes/partner.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import collateralRoutes from "./routes/collateral.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/loan-products", loanProductRoutes);
app.use("/api/loan-applications", loanApplicationRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/collaterals", collateralRoutes);

export default app;
