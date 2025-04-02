import React, { createContext, useContext } from "react";
import { useUser, useLogin, useRegister, useLogout } from "../hooks/useAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const {
    data: user,
    isLoading: isLoadingUser,
    isSuccess: isUserSucess,
    isError: isUserError,
    refetch: refetchUser,
  } = useUser();
  console.log(user);

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoadingUser,
    isError: isUserError,
    isSuccess: isUserSucess,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
