import Collateral from "../models/Collateral.js";

export const getCollaterals = async (req, res) => {
  try {
    const collaterals = await Collateral.findAll();
    res.json(collaterals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCollateral = async (req, res) => {
  try {
    const collateral = await Collateral.create(req.body);
    res.status(201).json(collateral);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
