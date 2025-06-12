

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const apiEndpoints = {
  list: `${API_BASE_URL}/list`,
  add: `${API_BASE_URL}/add`,
  update:  `${API_BASE_URL}/update/{id}`,
  deleteToDo:  `${API_BASE_URL}/delete/{id}`,
};

