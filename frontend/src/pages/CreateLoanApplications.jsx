import { useEffect, useState } from "react";
import api from "../api/api";

const CreateLoanApplication = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    applicant_name: "",
    requested_amount: "",
    LoanProductId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    api.get("/loan-products").then((res) => setProducts(res.data));
  }, []);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await api.post("/loan-applications", form);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setForm({
          applicant_name: "",
          requested_amount: "",
          LoanProductId: "",
        });
      }, 3000);
    } catch (error) {
      alert("Error creating loan application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.applicant_name && form.requested_amount && form.LoanProductId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <svg className="w-10 h-10 text-white transform -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-3">
            Apply for a Loan
          </h2>
          <p className="text-lg text-slate-600">
            Fill in your details and we'll process your application
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
          
          <div className="p-10">
            <div className="space-y-7">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Applicant Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.applicant_name}
                    onChange={(e) => setForm({ ...form, applicant_name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Requested Amount
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    ₹
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.requested_amount}
                    onChange={(e) => setForm({ ...form, requested_amount: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 text-xl font-semibold"
                  />
                </div>
                {form.requested_amount && (
                  <p className="mt-2 text-sm text-slate-500">
                    Amount: ₹{parseInt(form.requested_amount || 0).toLocaleString('en-IN')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                  Loan Product
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <select
                    value={form.LoanProductId}
                    onChange={(e) => setForm({ ...form, LoanProductId: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Choose a loan product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.interest_rate}% interest
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={submit}
              disabled={!isFormValid || isSubmitting}
              className={`mt-10 w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 ${
                isFormValid && !isSubmitting
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your information is secure and encrypted
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-md mx-4 animate-bounce-in">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 text-center mb-3">
                Application Submitted!
              </h3>
              <p className="text-slate-600 text-center text-lg">
                We'll review your application and get back to you soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLoanApplication;