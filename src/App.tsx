import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import NavBar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
import Logout from "./Logout";

// ========== GLOBAL API CONFIG ==========
export const API_URL = "http://localhost:8000/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  return res.json();
}

// ========== QUERY CLIENT ==========
const queryClient = new QueryClient();

export default function App() {
  // store current logged-in user's name
  const [userName, setUserName] = useState(localStorage.getItem("name"));

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} userName={userName} />

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login setUserName={setUserName} />} />

          {/* PROTECTED ROUTE */}
          <Route
            path="/todo"
            element={isLoggedIn ? <Todo /> : <Navigate to="/login" />}
          />

          <Route path="/logout" element={<Logout setUserName={setUserName} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
