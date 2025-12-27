import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ApiClient = sequelize.define("ApiClient", {
  name: DataTypes.STRING,
  api_key: DataTypes.STRING,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default ApiClient;
