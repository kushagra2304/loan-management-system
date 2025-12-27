import { LoanApplication, Collateral } from "../models/index.js";

export const createPartnerLoan = async (req, res) => {
  const { collaterals, ...data } = req.body;

  const application = await LoanApplication.create({
    ...data,
    source: "PARTNER_API",
    status: "SUBMITTED",
  });

  for (let c of collaterals) {
    await Collateral.create({
      ...c,
      LoanApplicationId: application.id,
      nav: 100,
      value: c.units_pledged * 100,
    });
  }

  res.json({
    application_id: application.id,
    status: application.status,
  });
};
