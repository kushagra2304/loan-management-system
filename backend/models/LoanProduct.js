import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const LoanProduct = sequelize.define("LoanProduct", {
  name: { type: DataTypes.STRING, allowNull: false },
  interest_rate: { type: DataTypes.FLOAT, allowNull: false },
  max_ltv_percentage: { type: DataTypes.FLOAT, allowNull: false },
  min_loan_amount: DataTypes.FLOAT,
  max_loan_amount: DataTypes.FLOAT,
  tenure_months: DataTypes.INTEGER,
});

export default LoanProduct;
