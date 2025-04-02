import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/src/components/ui/sonner";
import { AuthProvider } from "./context/auth.context";
import AuthForm from "./pages/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeeList from "./pages/EmployeeList";
import EmployeeDetail from "./pages/EmployeeDetail";
import EmployeeForm from "./pages/EmployeeForm";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthForm />} />

            {/* Redirection*/}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<EmployeeList />} />
                <Route path="employees">
                  <Route index element={<EmployeeList />} />
                  <Route path=":id" element={<EmployeeDetail />} />
                  <Route path="create" element={<EmployeeForm />} />
                  <Route path=":id/edit" element={<EmployeeForm />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import DashboardLayout from "./layouts/DashboardLayout";
// import EmployeeList from "./pages/EmployeeList";
// import EmployeeDetail from "./pages/EmployeeDetail";
// import EmployeeForm from "./pages/EmployeeForm";
// import { Toaster } from "@/src/components/ui/sonner";
// import AuthForm from "./pages/AuthForm";

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: 5 * 60 * 1000,
//     },
//   },
// });

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//           <Route path="/auth" element={<AuthForm />} />
//           <Route path="/" element={<DashboardLayout />}>
//             <Route index element={<EmployeeList />} />
//             <Route path="employees">
//               <Route index element={<EmployeeList />} />
//               <Route path=":id" element={<EmployeeDetail />} />
//               <Route path="create" element={<EmployeeForm />} />
//               <Route path=":id/edit" element={<EmployeeForm />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Router>
//       <Toaster />
//     </QueryClientProvider>
//   );
// }

// export default App;
