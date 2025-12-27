import { LoanProduct } from "../models/index.js";

export const createLoanProduct = async (req, res) => {
  const product = await LoanProduct.create(req.body);
  res.json(product);
};

export const getLoanProducts = async (req, res) => {
  const products = await LoanProduct.findAll();
  res.json(products);
};
