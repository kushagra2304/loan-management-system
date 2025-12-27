import { useEffect, useState } from "react";
import api from "../api/api";

const Collaterals = () => {
  const [collaterals, setCollaterals] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); 
  const [sortBy, setSortBy] = useState("value"); 

  useEffect(() => {
    api.get("/collaterals").then((res) => setCollaterals(res.data));
  }, []);

  const sortedCollaterals = [...collaterals].sort((a, b) => {
    if (sortBy === "value") return (b.value || 0) - (a.value || 0);
    if (sortBy === "name") return (a.fund_name || "").localeCompare(b.fund_name || "");
    if (sortBy === "units") return (b.units_pledged || 0) - (a.units_pledged || 0);
    return 0;
  });

  const totalValue = collaterals.reduce((sum, c) => sum + (c.value || 0), 0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">
                Collateral Assets
              </h2>
              <p className="text-slate-600 text-lg">
                Manage and track your pledged mutual fund units
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="value">Sort by Value</option>
                <option value="name">Sort by Name</option>
                <option value="units">Sort by Units</option>
              </select>

              <div className="flex bg-white border-2 border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Total Portfolio Value
                </p>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                ₹{totalValue.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Total Assets
                </p>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-bold text-slate-800">
                {collaterals.length}
                <span className="text-lg text-slate-500 ml-2">funds</span>
              </p>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {sortedCollaterals.map((c, idx) => (
              <div
                key={c.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-400 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {c.fund_name?.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                        Asset #{idx + 1}
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        ID: {c.id}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-6 leading-snug">
                    {c.fund_name}
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        ISIN
                      </p>
                      <p className="text-sm font-mono font-bold text-slate-800 tracking-wide">
                        {c.isin}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <div>
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                          Units Pledged
                        </p>
                        <p className="text-2xl font-bold text-amber-900">
                          {c.units_pledged?.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-amber-200 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                      <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider mb-1">
                        Current Value
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                        ₹{c.value?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <button className="mt-6 w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors duration-300 flex items-center justify-center gap-2">
                    View Details
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Fund Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      ISIN
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Units Pledged
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedCollaterals.map((c, idx) => (
                    <tr key={c.id} className="hover:bg-orange-50 transition-colors duration-200">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                            {c.fund_name?.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-base">
                              {c.fund_name}
                            </p>
                            <p className="text-sm text-slate-500">Asset #{idx + 1}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-mono text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg inline-block">
                          {c.isin}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-lg font-bold text-amber-700">
                          {c.units_pledged?.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-slate-500">units</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          ₹{c.value?.toLocaleString('en-IN')}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {collaterals.length === 0 && (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-200">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">No Collateral Assets</h3>
            <p className="text-lg text-slate-600 mb-8">
              You haven't pledged any mutual fund units yet
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
              Add Collateral
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaterals;