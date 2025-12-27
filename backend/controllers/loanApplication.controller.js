import { LoanApplication, Collateral } from "../models/index.js";

export const createLoanApplication = async (req, res) => {
  const { collaterals, ...data } = req.body;

  const application = await LoanApplication.create(data);

  if (collaterals?.length) {
    for (let c of collaterals) {
      await Collateral.create({
        ...c,
        LoanApplicationId: application.id,
        nav: 100,
        value: c.units_pledged * 100,
      });
    }
  }

  res.json(application);
};

export const getLoanApplications = async (req, res) => {
  const apps = await LoanApplication.findAll({ include: Collateral });
  res.json(apps);
};
