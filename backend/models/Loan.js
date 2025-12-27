import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Loan = sequelize.define("Loan", {
  sanctioned_amount: DataTypes.FLOAT,
  interest_rate: DataTypes.FLOAT,
  outstanding_amount: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM("ONGOING", "CLOSED", "DEFAULTED"),
    defaultValue: "ONGOING",
  },
});

export default Loan;
