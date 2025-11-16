import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Base URL for backend
const BASE_URL = "http://localhost:8000/api";

/**
 * Fetch current user
 */
export const fetchUser = async () => {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

/**
 * Login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { email: string; password: string }) => {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Login failed");
      return res.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );
};

/**
 * Signup mutation
 */
export const useSignup = () => {
  return useMutation(
    async (data: { name: string; email: string; password: string }) => {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Signup failed");
      return res.json();
    }
  );
};

/**
 * Logout function
 */
export const logout = async () => {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};
