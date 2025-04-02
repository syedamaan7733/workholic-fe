// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/src/context/auth.context";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
console.log("from protected route", isAuthenticated);

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
