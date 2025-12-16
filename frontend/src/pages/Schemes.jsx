import React from "react";
import { Outlet } from "react-router-dom";
import SchemesSubNav from "../components/SchemesSubNav";

const Schemes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Schemes</h1>
        <p className="text-gray-600 mt-2 mb-6">Browse government schemes and subsidy details for farmers.</p>
      </div>

      {/* Sub navigation under the main navbar */}
      <SchemesSubNav />

      {/* Child routes render here (gov by default) */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Schemes;
