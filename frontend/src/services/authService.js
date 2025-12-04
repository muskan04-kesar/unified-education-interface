import axios from "axios";

const API_URL = "http://localhost:5000/api";

// -------------------------------
// Institution Login
// -------------------------------
export const institutionLogin = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email });
    return response.data;
  } catch (error) {
    console.error("Institution Login Error:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// -------------------------------
// Government Login
// -------------------------------
export const governmentLogin = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/gov/auth/login`, { email });
    return response.data;
  } catch (error) {
    console.error("Government Login Error:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// -------------------------------
// Save Token
// -------------------------------
export const saveToken = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// -------------------------------
// Get Token
// -------------------------------
export const getToken = () => {
  return localStorage.getItem("token");
};

// -------------------------------
// Logout
// -------------------------------
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
