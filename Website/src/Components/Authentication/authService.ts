// src/services/authService.ts
import axios, { AxiosError } from 'axios';

const API_URL = 'https://localhost:5001/api/authentication'; // Update this URL to match your backend

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    return response.data; // Return the user data if login is successful
  } catch (error: unknown) {
    handleError(error); // Handle errors with a helper function
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (error: unknown) {
    handleError(error); // Handle errors with a helper function
  }
};

export const getUserStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/status`, { withCredentials: true });
    return response.data; // Return the user data if the user is logged in
  } catch (error: unknown) {
    handleError(error); // Handle errors with a helper function
  }
};

// Helper function to handle errors
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Check if error is an AxiosError
    throw new Error(error.response?.data?.message || 'An error occurred'); // Throw the error message
  } else {
    throw new Error('An unexpected error occurred'); // Generic error message for other types
  }
};
