import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const apiEndpoints = {
    todos: {
        add: `${API_BASE_URL}/todos/add`,
    },
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});