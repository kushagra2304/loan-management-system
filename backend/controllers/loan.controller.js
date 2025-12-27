import { Loan } from "../models/index.js";

export const getOngoingLoans = async (req, res) => {
  const loans = await Loan.findAll();
  res.json(loans);
};
