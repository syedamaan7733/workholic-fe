import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { UserPlus, Users, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/src/context/auth.context";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-100 text-blue-800" : "";
  };
  console.log("layout", user.user);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-0 md:w-64 transition-all bg-white shadow-md">
        <div className="p-6">
          <Link
            to="/"
            className={`flex items-center hover:pointer
          `}
          >
            <h1 className="hidden md:flex md:text-2xl font-bold text-blue-800">
              EMS Admin
            </h1>
          </Link>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                to="/"
                className={`flex items-center px-6 py-3 hover:bg-blue-50 ${isActive(
                  "/"
                )}`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className={`flex items-center px-6 py-3 hover:bg-blue-50 ${isActive(
                  "/employees"
                )}`}
              >
                <Users className="mr-3 h-5 w-5" />
                <span>Employees</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees/create"
                className={`flex items-center px-6 py-3 hover:bg-blue-50 ${isActive(
                  "/employees/create"
                )}`}
              >
                <UserPlus className="mr-3 h-5 w-5" />
                <span>Add Employee</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="relative md:absolute md:bottom-0 md:left-0 w-64  bottom-[55%] left-  p-6">
          <button
            onClick={logout}
            className="flex items-center bg-primary md:bg-transparent text-stone-200 md:border-2  md:text-primary px-4 py-2 rounded-2xl md:rounded-none hover:text-red-600"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === "/" && "Dashboard"}
              {location.pathname === "/employees" && "Employee Management"}
              {location.pathname === "/employees/create" && "Add New Employee"}
              {location.pathname.includes("/employees/") &&
                location.pathname.includes("/edit") &&
                "Edit Employee"}
              {location.pathname.includes("/employees/") &&
                !location.pathname.includes("/edit") &&
                !location.pathname.includes("/create") &&
                "Employee Details"}
            </h2>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
