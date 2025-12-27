import dotenv from "dotenv";

import app from "./app.js";
import sequelize from "./config/db.js";
import "./models/index.js";


const PORT = process.env.PORT || 5000;

dotenv.config();
const startServer = async () => {
  try {
    // 1️⃣ Verify DB connection
    await sequelize.authenticate();
    console.log("✅ Database authenticated");

    // 2️⃣ Sync models (safe for dev)
    await sequelize.sync({ alter: false });
    console.log("✅ Models synced");

    // 3️⃣ Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
