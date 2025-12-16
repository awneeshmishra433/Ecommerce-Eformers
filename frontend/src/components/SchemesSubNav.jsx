import React from "react";
import { NavLink } from "react-router-dom";

const SchemesSubNav = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-md ${isActive ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-gray-800"}`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
          <NavLink to="/schemes/gov" className={linkClass}>
            Government Schemes
          </NavLink>
          <NavLink to="/schemes/subsidy" className={linkClass}>
            Subsidy Details
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default SchemesSubNav;
