import LoanProduct from "./LoanProduct.js";
import LoanApplication from "./LoanApplication.js";
import Collateral from "./Collateral.js";
import Loan from "./Loan.js";

LoanProduct.hasMany(LoanApplication);
LoanApplication.belongsTo(LoanProduct);

LoanApplication.hasMany(Collateral);
Collateral.belongsTo(LoanApplication);

LoanApplication.hasOne(Loan);
Loan.belongsTo(LoanApplication);

export {
  LoanProduct,
  LoanApplication,
  Collateral,
  Loan,
};
