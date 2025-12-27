import { useEffect, useState } from "react";
import api from "../api/api";

const LoanProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get("/loan-products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-block">
            <h1 className="text-5xl font-bold text-slate-800 mb-2">
              Loan Products
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full"></div>
          </div>
          <p className="mt-4 text-slate-600 text-lg">
            Choose the perfect financing solution tailored to your needs
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {products.map((p, idx) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200"
              onMouseEnter={() => setSelectedProduct(p.id)}
              onMouseLeave={() => setSelectedProduct(null)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-400 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">
                    {idx + 1}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 pr-16">
                  {p.name}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
                        Interest Rate
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {p.interest_rate}
                        <span className="text-lg text-slate-600">%</span>
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                      Maximum LTV
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-700"
                          style={{ width: selectedProduct === p.id ? `${p.max_ltv_percentage}%` : '0%' }}
                        ></div>
                      </div>
                      <span className="text-xl font-bold text-slate-700 min-w-[3rem]">
                        {p.max_ltv_percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full py-3.5 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors duration-300 group-hover:shadow-lg">
                  Apply Now
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-xl text-slate-600 font-medium">No loan products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanProducts;