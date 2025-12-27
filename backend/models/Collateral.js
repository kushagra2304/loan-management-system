import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Collateral = sequelize.define("Collateral", {
  fund_name: DataTypes.STRING,
  isin: DataTypes.STRING,
  units_pledged: DataTypes.FLOAT,
  nav: DataTypes.FLOAT,
  value: DataTypes.FLOAT,
});

export default Collateral;
