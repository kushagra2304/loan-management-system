import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const LoanApplication = sequelize.define("LoanApplication", {
  applicant_name: { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  requested_amount: DataTypes.FLOAT,
  status: {
    type: DataTypes.ENUM("DRAFT", "SUBMITTED", "APPROVED", "REJECTED"),
    defaultValue: "DRAFT",
  },
  source: {
    type: DataTypes.ENUM("INTERNAL", "PARTNER_API"),
    defaultValue: "INTERNAL",
  },
});

export default LoanApplication;
