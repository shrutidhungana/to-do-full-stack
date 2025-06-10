

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const apiEndpoints = {
    todos: {
        add: `${API_BASE_URL}/todos/add`,
    },
};

