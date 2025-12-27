import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import LoanProducts from "./pages/LoanProducts";
import LoanApplications from "./pages/LoanApplications";
import CreateLoanApplication from "./pages/CreateLoanApplications";
import OngoingLoans from "./pages/OngoingLoans";
import Collaterals from "./pages/Collaterals";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoanProducts />} />
        <Route path="/loan-applications" element={<LoanApplications />} />
        <Route path="/create-loan" element={<CreateLoanApplication />} />
        <Route path="/ongoing-loans" element={<OngoingLoans />} />
        <Route path="/collaterals" element={<Collaterals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
