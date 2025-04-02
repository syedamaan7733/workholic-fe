// src/hooks/auth.hooks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/src/services/auth.api";
import { authToken } from "@/src/services/token.service";

export function useUser() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,

    enabled: !!authToken.getToken(),
    initialData: () => queryClient.getQueryData(["user"]),
  });
}

// Registration
export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      authToken.setToken(data.accessTkn);
      queryClient.setQueryData(["user"], data.user); // Set cache
      navigate("/dashboard");
    },
  });
}

// login
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log(data.user);

      authToken.setToken(data.accessTkn);
      queryClient.setQueryData(["user"], data.user); // Set cache
      queryClient.invalidateQueries(["user"]); // Ensure fresh data
      navigate("/dashboard");
    },
  });
}

//logout
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      // Use token service
      authToken.removeToken();
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries();
      navigate("/login");
    },
  });
}
