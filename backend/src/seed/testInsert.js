import dotenv from "dotenv";
dotenv.config();

import sequelize from "../../config/db.js";
import {
  LoanProduct,
  LoanApplication,
  Collateral,
  Loan,
} from "../../models/index.js";
import ApiClient from "../../models/ApiClient.js";

const runTestInsert = async () => {
  try {
    await sequelize.authenticate();
    console.log(" DB Connected");

    // Loan Product
    const loanProduct = await LoanProduct.create({
      name: "TEST LAMF PRODUCT",
      interest_rate: 10,
      max_ltv_percentage: 50,
      min_loan_amount: 50000,
      max_loan_amount: 1000000,
      tenure_months: 12,
    });

    console.log("✅ LoanProduct created:", loanProduct.id);

    // API Client
    const apiClient = await ApiClient.create({
      name: "TEST FINTECH",
      api_key: "TEST_API_KEY_123",
      is_active: true,
    });

    console.log("✅ ApiClient created:", apiClient.id);

    // Loan Application
    const loanApplication = await LoanApplication.create({
      applicant_name: "Test User",
      email: "testuser@email.com",
      phone: "9999999999",
      requested_amount: 300000,
      status: "SUBMITTED",
      source: "INTERNAL",
      LoanProductId: loanProduct.id,
    });

    console.log("✅ LoanApplication created:", loanApplication.id);

    // Collateral
    const collateral = await Collateral.create({
      fund_name: "Test Mutual Fund",
      isin: "INF000TEST01",
      units_pledged: 100,
      nav: 100,
      value: 100 * 100,
      LoanApplicationId: loanApplication.id,
    });

    console.log("✅ Collateral created:", collateral.id);

    // Loan (Ongoing)
    const loan = await Loan.create({
      sanctioned_amount: 250000,
      interest_rate: loanProduct.interest_rate,
      outstanding_amount: 250000,
      status: "ONGOING",
      LoanApplicationId: loanApplication.id,
    });

    console.log("✅ Loan created:", loan.id);

    console.log("\n🎉 ALL TEST RECORDS INSERTED SUCCESSFULLY");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test insert failed:", error);
    process.exit(1);
  }
};

runTestInsert();
