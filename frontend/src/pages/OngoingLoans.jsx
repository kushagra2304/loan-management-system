import { useEffect, useState } from "react";
import api from "../api/api";

const OngoingLoans = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    api.get("/loans").then((res) => setLoans(res.data));
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      active: "from-emerald-500 to-green-500",
      pending: "from-amber-500 to-yellow-500",
      completed: "from-blue-500 to-indigo-500",
      defaulted: "from-rose-500 to-red-500"
    };
    return colors[status?.toLowerCase()] || "from-slate-500 to-slate-600";
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: "bg-emerald-100 text-emerald-800 border-emerald-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      defaulted: "bg-rose-100 text-rose-800 border-rose-200"
    };
    return badges[status?.toLowerCase()] || "bg-slate-100 text-slate-800 border-slate-200";
  };

  const totalSanctioned = loans.reduce((sum, loan) => sum + (loan.sanctioned_amount || 0), 0);
  const activeLoans = loans.filter(l => l.status?.toLowerCase() === "active").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">
                My Loan Portfolio
              </h2>
              <p className="text-slate-600 text-lg">
                Track your active and completed loans
              </p>
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Application
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Total Loans
                </p>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-800">{loans.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Active Loans
                </p>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-800">{activeLoans}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Total Sanctioned
                </p>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-800">
                ₹{totalSanctioned.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {loans.map((loan, idx) => (
            <div
              key={loan.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 cursor-pointer"
              onClick={() => setSelectedLoan(loan.id === selectedLoan ? null : loan.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${getStatusColor(loan.status)}`}></div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Loan #{loan.id}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-800">
                      ₹{loan.sanctioned_amount?.toLocaleString('en-IN')}
                    </h3>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-xs font-bold border uppercase tracking-wider ${getStatusBadge(loan.status)}`}>
                    {loan.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Sanctioned</p>
                        <p className="text-sm font-bold text-slate-800">
                          ₹{loan.sanctioned_amount?.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {loan.interest_rate && (
                    <div className="flex items-center justify-between py-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Interest Rate</p>
                          <p className="text-sm font-bold text-slate-800">{loan.interest_rate}%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {loan.tenure && (
                    <div className="flex items-center justify-between py-3 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Tenure</p>
                          <p className="text-sm font-bold text-slate-800">{loan.tenure} months</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button className="mt-6 w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors duration-300 flex items-center justify-center gap-2">
                  View Details
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getStatusColor(loan.status)} rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {loans.length === 0 && (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-200">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">No Active Loans</h3>
            <p className="text-lg text-slate-600 mb-8">
              You don't have any ongoing loans at the moment
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
              Apply for a New Loan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OngoingLoans;